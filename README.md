# Leaflet Challenge

## Overview

This application visualizes earthquake data on a map, displaying various earthquake events with markers that are colored based on the depth of the event. Each marker's size is proportional to the magnitude of the earthquake. The map includes a control layer for enabling earthquake layer and a legend explaining the color coding of the earthquake depths.

## Features

- Interactive map.
- Earthquake events visualized with colored and sized markers based on depth and magnitude.
- Earthquake layer to show or hide markers.
- A legend that illustrates the depth color coding.

## Usage

To use the application, simply open the HTML file in a web browser. The map will automatically fetch the latest earthquake data and display it on the map.
Alternatively you can access the map via this link: [leaflet challenge](https://icherniavskyi.github.io/leaflet-challenge/).

### Dependencies

- Leaflet.js for map functionality.
- The earthquake data is fetched from the USGS Earthquake API.

## Code Description

- `createMap(earthquakeLayer)`: Initializes the base map and adds the earthquake layer and control layers.
- `createMarkers(response)`: Processes the earthquake data and creates markers for each earthquake.
- `getColor(depth)`: Determines the color of the marker based on the depth of the earthquake.
- `addLegend(map)`: Adds a legend to the map.

## Data Source

The earthquake data is sourced from the United States Geological Survey (USGS) Earthquake API:
`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`
