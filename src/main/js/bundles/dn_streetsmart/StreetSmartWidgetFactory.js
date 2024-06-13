/*
 * Copyright (C) 2024 con terra GmbH (info@conterra.de)
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
import IFrameContent from "ct/ui/desktop/IFrameContent";

export default class StreetSmartWidgetFactory {

    #iFrameContent = null;

    activate() {
        this._initComponent();
    }

    deactivate() {
        this.#iFrameContent = null;
    }

    _initComponent() {
        const url = this._properties.iFrameUrl;
        this.#iFrameContent = new IFrameContent({
            src: url
        });

        this.#iFrameContent.getIFrameWindow().then((iFrameWindow) => {
            if (iFrameWindow?.streetSmartAPI) {
                const div = iFrameWindow.document.getElementById("streetSmartDiv");
                this._streetSmartController.initStreetSmartAPI(iFrameWindow.streetSmartAPI, div);
            }
        });
    }

    createInstance() {
        return this.#iFrameContent;
    }

}
