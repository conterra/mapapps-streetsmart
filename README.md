# Street Smart Bundle
The Street Smart Bundle uses the Cyclorama functionality to allow the user to select a location on the map and see Street Smart images for that location in a separated window.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_streetsmart/index.html

## Installation Guide
**Requirement: map.apps 4.7.0**

[dn_streetsmart Documentation](https://github.com/conterra/mapapps-streetsmart/tree/master/src/main/js/bundles/dn_streetsmart)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
