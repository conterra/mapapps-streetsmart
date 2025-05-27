# dn_streetsmart
The Street Smart Bundle uses the Cyclorama functionality to allow the user to select a location on the map and see Street Smart images for that location in a separated window.

## Usage
**Requirement: map.apps 4.7.0**

1. First you need to add the bundle dn_streetsmart to your app.
2. Then you need to configure it.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID                   | Component                 | Description                             |
|---------------------------|---------------------------|-----------------------------------------|
| streetSmartToggleTool     | StreetSmartToggleTool     | Show or hide the widget.                |
| streetSmartModeToggleTool | StreetSmartModeToggleTool | Toggle between MapCenter and Edit mode. |

## Configuration Reference

### Window configuration

You can either use the default map.apps template (template-seasons) if you want to display the Streetsmart widget in a window. This has the disadvantage that the map is overlaid by the widget.

```javascript
"allowedBundles": [
    ...
    "dn_streetsmart",
    "template-seasons"
],
```

Or you can use the template-streetsmart, which provides its own anchor point for the Streetsmart widget.

```javascript
"allowedBundles": [
    ...
    "dn_streetsmart",
    "template-streetsmart"
],
```

### Config

#### Sample configuration
```json
"Config": {
    "streetSmartProperties": {
        "apiKey": "",
        "username": "",
        "password": "",
        "srs": "",
        "locale": "de",
        "overlayDrawDistance": 30,
        "addressSettings": {
            "locale": "de",
            "database": "Nokia"
        },
        "panoramaViewerInstance": {
            "method": "lookAtCoordinate",
            "parameters": {
                "coordinate": [356491.961,5645458.686]
            }
        },
        "panoramaViewerMaximizable": false
    },
    "streetSmartLayerId": null,
    "useMapCenterLocation": false,
    "mapCenterLocationDelay": 250,
    "closeOnNoData": true,
    "minScale": null,
    "markerSymbols": {
        "normal": {
            "type": "picture-marker",
            "url": "resource('./images/green/streetViewMarker.png')",
            "width": 30,
            "height": 30
        },
        "dragging": {
            "type": "picture-marker",
            "url": "resource('./images/green/streetViewMarkerDragging.png')",
            "width": 30,
            "height": 30
        },
        "available": {
            "type": "picture-marker",
            "url": "resource('./images/green/streetViewMarkerAvailable.png')",
            "width": 30,
            "height": 30
        }
    },
    "measurementSymbols": {
        "point": {
            "type": "simple-marker",
            "color": [
                236,
                122,
                8,
                0.25
            ],
            "size": 16,
            "outline": {
                "color": [
                    236,
                    122,
                    8,
                    1
                ],
                "width": 2
            }
        },
        "polyline": {
            "type": "simple-line",
            "width": 1.3,
            "color": [
                236,
                122,
                8,
                1
            ]
        },
        "polygon": {
            "type": "simple-fill",
            "color": [
                236,
                122,
                8,
                0.25
            ],
            "style": "solid",
            "outline": {
                "color": [
                    236,
                    122,
                    8,
                    1
                ],
                "width": 2
            }
        },
        "text": {
            "type": "text",
            "color": "white",
            "haloColor": "black",
            "haloSize": "1px",
            "font": {
                "size": 12,
                "weight": "bold"
            }
        }
    }
}
```

#### Change the marker color

You can use green, blue, orange or pink markers. To change the color you need to change the image-urls:

```javascript
# green
"url": "resource('./images/green/streetViewMarker.png')"
# blue
"url": "resource('./images/blue/streetViewMarker.png')"
# orange
"url": "resource('./images/orange/streetViewMarker.png')"
# pink
"url": "resource('./images/pink/streetViewMarker.png')"
```

#### PanormaViewer sample configurations

##### lookAtCoordinate
```json
{
    "method": "lookAtCoordinate",
    "parameters": {
        "coordinate": [356491.961,5645458.686]
    }
}
```

##### openByCoordinate
```json
{
    "method": "openByCoordinate",
    "parameters": {
        "coordinate": [356491.961,5645458.686]
    }
}
```

##### openByAddress
```json
{
    "method": "openByAddress",
    "parameters": {
        "query": "Van Voordenpark 1B, Zaltbommel"
    }
}
```

##### openByImageId
```json
{
    "method": "openByImageId",
    "parameters": {
        "imageId": "5D38RPNF"
    }
}
```
