# dn_streetsmart
The Street Smart Bundle uses the Cyclorama functionality to allow the user to select a location on the map and see Street Smart images for that location in a separated window.

## Usage
**Requirement: map.apps 4.7.0**

1. First you need to add the bundle dn_streetsmart to your app.
2. Then you need to configure it.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID               | Component             | Description              |
|-----------------------|-----------------------|--------------------------|
| streetSmartToggleTool | StreetSmartToggleTool | Show or hide the widget. |

## Configuration Reference

### Config

#### Sample configuration
```json
"Config": {
    "streetSmartProperties": {
        "apiKey": "",
        "username": "",
        "password": "",
        "srs": "",
        "locale": "en-US",
        "overlayDrawDistance": 30,
        "addressSettings": {
            "locale": "de",
            "database": "Nokia"
        },
        "panoramaViewerInstance": {
            "type": "lookAtCoordinate",
            "coordinate": [
                356491.961,
                5645458.686
            ]
        }
    },
    "streetSmartLayerId": null,
    "markerSymbols": {
        "normal": {
            "type": "picture-marker",
            "url": "resource('./images/streetViewMarker.png')",
            "width": 30,
            "height": 30
        },
        "dragging": {
            "type": "picture-marker",
            "url": "resource('./images/streetViewMarkerDragging.png')",
            "width": 30,
            "height": 30
        },
        "available": {
            "type": "picture-marker",
            "url": "resource('./images/streetViewMarkerAvailable.png')",
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

#### PanormaViewer sample configurations

##### lookAtCoordinate
```json
{
    "method": "lookAtCoordinate",
    "parameters": {
        "coordinate": {
            356491.961,
            5645458.686
        }
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
