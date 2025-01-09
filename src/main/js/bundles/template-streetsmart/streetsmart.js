/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
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
import mobile_portrait from "dojo/text!./streetsmart_mobile_portrait.html";
import mobile_landscape from "dojo/text!./streetsmart_mobile_landscape.html";
import streetsmart from "dojo/text!./streetsmart.html";
import "dijit/layout/BorderContainer";
import "dijit/layout/ContentPane";
import "ct/ui/template/OverlayContainer";
import "windowmanager/WindowDockingBar";

export default {
    widgets: [{
        widgetRole: "full-screen-window",
        window: {
            marginBox: {
                l: 0,
                t: 0,
                r: 0,
                b: 0
            },
            fixEdgesInViewPort: {
                t: true,
                b: true,
                l: true,
                r: true
            },
            autofocus: false,
            resizable: false,
            minimizeOnClose: true,
            dndDraggable: false,
            draggable: false,
            maximizable: false
        }
    }
    ],
    layouts: [
        {
            requiredExecutionEnvironment: ['iPad'],
            orientation: 'landscape',
            templateString: streetsmart,
            name: 'tablet_landscape'
        },
        {
            requiredExecutionEnvironment: ['iPad'],
            orientation: 'portrait',
            templateString: streetsmart,
            name: 'tablet_portrait'
        },
        {
            requiredExecutionEnvironment: ['mobile'],
            orientation: 'portrait',
            templateString: mobile_portrait,
            name: 'mobile_portrait'
        },
        {
            requiredExecutionEnvironment: ['mobile'],
            orientation: 'landscape',
            templateString: mobile_landscape,
            name: 'mobile_landscape'
        },
        {
            requiredExecutionEnvironment: ['android'],
            orientation: 'landscape',
            templateString: streetsmart,
            name: 'tablet_landscape'
        },
        {
            requiredExecutionEnvironment: ['android'],
            orientation: 'portrait',
            templateString: streetsmart,
            name: 'tablet_portrait'
        },
        {
            maxWidth: 768,
            orientation: 'portrait',
            templateString: mobile_portrait,
            name: 'mobile_portrait'
        },
        {
            maxWidth: 768,
            orientation: 'landscape',
            templateString: mobile_landscape,
            name: 'mobile_landscape'
        },
        {
            maxWidth: 992,
            orientation: 'portrait',
            templateString: streetsmart,
            name: 'tablet_portrait'
        },
        {
            maxWidth: 992,
            orientation: 'landscape',
            templateString: streetsmart,
            name: 'tablet_landscape'
        },
        {
            templateString: streetsmart,
            name: "desktop"
        }
    ]
};
