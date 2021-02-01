/*
 * Copyright (C) 2020 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Point from "esri/geometry/Point";

export default class StreetSmartController {

    #streetSmartAPI = null;
    #streetSmartWatcher = null;
    #streetSmartProperties = null;
    #clickWatcher = null;
    #panorama = null;

    activate() {
        this.#streetSmartWatcher = [];
        this.#streetSmartProperties = this._streetSmartModel.streetSmartProperties;
    }

    deactivate() {
        this.#streetSmartAPI = null;
        this.#panorama = null;
        this.#streetSmartProperties = null;
        this._removeWatcher();
    }

    activateStreetSmart(event) {
        this._tool = event.tool;
        this._createMarker();
        this._openPanorama();
        this._setStreetSmartLayerVisibility(true);
        this._registerWatcher();
    }

    deactivateStreetSmart() {
        this._removeWatcher();
        this._setProcessingStreetSmart(false);
        this._setStreetSmartLayerVisibility(false);

        this._measurementController.removeMeasurements();
        this._markerController.deactivateMarker();
    }

    initStreetSmartAPI(streetSmartAPI, streetSmartDiv) {
        this._setProcessingStreetSmart(true);
        this.#streetSmartAPI = streetSmartAPI;
        const streetSmartProperties = this.#streetSmartProperties;
        streetSmartAPI.init({
            targetElement: streetSmartDiv,
            username: streetSmartProperties.username,
            password: streetSmartProperties.password,
            apiKey: streetSmartProperties.apiKey,
            srs: streetSmartProperties.srs,
            locale: streetSmartProperties.locale,
            overlayDrawDistance: streetSmartProperties.overlayDrawDistance,
            addressSettings: streetSmartProperties.addressSettings
        }).then(() => {
            console.log("StreetSmart API initialized");
            this._openPanorama(null, true);
        },
        err => {
            const msg = err.stack.toString();
            this._logger.error(msg);
            this._setProcessingStreetSmart(false);
            console.error("Api: init: failed. Error: ", err);
        }
        );
    }

    _openPanorama(point, firstOpen) {
        if(!point) {
            const mapWidgetModel = this._mapWidgetModel;
            point = mapWidgetModel.center;
        }
        this._getCoordinates(point).then((coordinates) => {
            const properties = this._streetSmartModel;
            const viewerType = this.#streetSmartAPI?.ViewerType?.PANORAMA;
            const srs = properties.srs;

            this.#streetSmartAPI.open(coordinates, {
                viewerType: viewerType,
                srs: srs,
                panoramaViewer: {
                    replace: true,
                    closable: false,
                    maximizable: false
                }
            }).then(
                result => {
                    if (result.length) {
                        const panorama = this.#panorama = result[0];
                        const recording = panorama.props.recording;
                        this._updateMarkerPosition(recording);
                        if (firstOpen) {
                            this._registerWatcher();
                            this._panoramaViewerCustomMethod(panorama);
                        }
                        this._setProcessingStreetSmart(false);
                    }
                }
            ).catch(reason => {
                this._setProcessingStreetSmart(false);
                this._logger.error({
                    message: reason.toString()
                });
                console.error("Error opening panorama viewer: " + reason);
            });
        });
    }

    _setStreetSmartLayerVisibility(visible) {
        const streetSmartLayerId = this._streetSmartModel.streetSmartLayerId;
        if (streetSmartLayerId) {
            const streetSmartLayer = this._mapWidgetModel.map.findLayerById(streetSmartLayerId);
            if (streetSmartLayer) {
                streetSmartLayer.visible = visible;
            }
        }
    }

    _panoramaViewerCustomMethod(panorama) {
        const streetSmartProperties = this.#streetSmartProperties;
        const panoramaViewerInstance = streetSmartProperties.panoramaViewerInstance;
        if (panoramaViewerInstance && panoramaViewerInstance.method && panoramaViewerInstance.parameters) {
            const srs = panorama.props.recording.srs;

            const coordinate = panoramaViewerInstance.parameters.coordinate;
            const imageId = panoramaViewerInstance.parameters.imageId;
            const query = panoramaViewerInstance.parameters.query;
            const recording = panorama.props.recording;
            switch (panoramaViewerInstance.method) {
                case "lookAtCoordinate":
                    if (!coordinate) {
                        return;
                    }
                    panorama.lookAtCoordinate(coordinate, srs);
                    this._updateMarkerPosition(recording);
                    break;
                case "openByCoordinate":
                    if (!coordinate) {
                        return;
                    }
                    panorama.openByCoordinate(coordinate, srs).then(recording => {
                        this._updateMarkerPosition(recording);
                    });
                    break;
                case "openByAddress":
                    if (!query) {
                        return;
                    }
                    panorama.openByAddress(query, srs).then(recording => {
                        this._updateMarkerPosition(recording);
                    });
                    break;
                case "openByImageId":
                    if (!imageId) {
                        return;
                    }
                    panorama.openByImageId(imageId, srs).then(recording => {
                        this._updateMarkerPosition(recording);
                    });
                    break;
            }
        }
    }

    _registerWatcher() {
        const panorama = this.#panorama;
        if (panorama) {
            this.#clickWatcher = this._connectOnClickEvent();
            this.#streetSmartWatcher.push(this._connectToMeasurementEvent());
            this._connectToStreetSmartAPIEvents(panorama);
        }
    }

    _removeWatcher() {
        this.#streetSmartWatcher.forEach((watcher) => {
            watcher.removeListener();
        })
        this.#streetSmartWatcher = [];
        this.#clickWatcher.remove();
        this.#clickWatcher = null;
    }

    _setProcessingStreetSmart(processing) {
        const tool = this._tool;
        if (tool) {
            tool.set("processing", processing);
        }
    }

    _createMarker() {
        const mapWidgetModel = this._mapWidgetModel;
        mapWidgetModel.view.scale = 2500;
        const center = mapWidgetModel.center;

        const markerController = this._markerController;
        markerController.activateMarker();
        markerController.drawMarker(center, 0);
        markerController.getSketchViewModel().on("update", event => {
            const toolType = event?.toolEventInfo?.type;
            if (toolType === "move-stop") {
                const point = this._markerController.getPosition();
                if(!point) {
                    return;
                }
                if(this._tool.active){
                    this._openPanorama(point);
                }
            }
        });
    }

    _connectOnClickEvent() {
        const view = this._mapWidgetModel.view;
        const streetSmartLayerId = this._streetSmartModel.streetSmartLayerId;
        return view.on("click", event => {
            view.hitTest(event).then(response => {
                const results = response.results;
                if (response.results.length > 0) {
                    //proof that the event was not triggered on the marker's graphic.
                    const clickOnMarker = response.results.some(result => {
                        const graphic = result.graphic;
                        return graphic.layer?.id === "streetSmartMarkerGraphicLayer";
                    });
                    if (!clickOnMarker && streetSmartLayerId) {
                        for (let i = 0; i < results.length; i++) {
                            // Check if the graphic belongs to the cyclorama point layer and open the new panorama images
                            const graphic = results[i].graphic;
                            if (graphic.layer?.id === streetSmartLayerId) {
                                const point = graphic.geometry;
                                this._openPanorama(point);
                                break;
                            }
                        }
                    }
                }
            });
        });
    }

    _connectToStreetSmartAPIEvents(panorama) {
        this.#streetSmartWatcher.push(panorama.on("VIEW_CHANGE", event => {
            const angle = event.detail.yaw;
            this._markerController.drawMarker(null, angle);
        }));
        this.#streetSmartWatcher.push(panorama.on("RECORDING_CLICK", event => {
            this._updateMarkerPosition(event.detail.recording);
        }));
    }

    _connectToMeasurementEvent() {
        return this.#streetSmartAPI.on("MEASUREMENT_CHANGED", event => {
            const measurementFeatures = this._measurementController.drawMeasurement(event);
            if (measurementFeatures?.length === 1) {
                this._centerOnMarker(250);
            }
        });
    }

    _updateMarkerPosition(recording) {
        const angle = recording.orientation;
        this._getPoint(recording).then((point) => {
            this._markerController.drawMarker(point, angle);
            this._centerOnMarker();
        })
    }

    _getPoint(recording) {
        const srs = this.#streetSmartProperties.srs;
        const wkid = srs.split(":")[1];
        const targetWkid = this._mapWidgetModel.spatialReference.wkid;

        const xyz = recording.xyz;
        const x = xyz[0];
        const y = xyz[1];
        const point = new Point({
            x: x,
            y: y,
            spatialReference: {
                wkid: wkid
            }
        });
        return this._coordinateTransformer.transform(
            point,
            targetWkid
        ).then((transformedPoint) => transformedPoint);
    }

    _getCoordinates(point) {
        const srs = this.#streetSmartProperties.srs;
        const targetWkid = srs.split(":")[1];
        return this._coordinateTransformer.transform(
            point,
            targetWkid
        ).then((transformedPoint) => {
            const x = transformedPoint.x.toString();
            const y = transformedPoint.y.toString();
            return x + " , " + y;
        });
    }

    _centerOnMarker(scale) {
        const point = this._markerController.getPosition();
        if(!point){
            return;
        }
        const mapWidgetModel = this._mapWidgetModel;
        mapWidgetModel.center = point;
        if (scale) {
            mapWidgetModel.scale = scale;
        }
        this._centerMapOnHalfWindow();
    }

    _centerMapOnHalfWindow() {
        const mapWidgetModel = this._mapWidgetModel;
        const extent = mapWidgetModel.extent;
        const difx = extent.xmax - extent.xmin;
        const difIntx = difx / 4;
        const center = mapWidgetModel.center;
        const newCenter = center.clone();
        newCenter.x = center.x + difIntx;
        mapWidgetModel.center = newCenter;
    }

}
