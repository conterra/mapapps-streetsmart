# template-streetsmart

The Streetsmart Template bundle provides the map.apps default layout template with responsive capabilities and predefined anchor points.
In addition, it adds a special anchor point for the Streetsmart widget.

## Usage

To enable the Streetsmart Template, add it to the `allowedBundles` section within the `app.json` file and tell the `templates` bundle to select it. Example:
```json
"templates": {
    "TemplateModel": {
        "_selectedTemplate": "streetsmart"
    }
}
```
