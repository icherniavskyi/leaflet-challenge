function createMap(earthquakeLayer) {
    map = L.map('map', {
        center: [0, 0],
        zoom: 2
    });

    lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    baseMaps = {
        "Light Map": lightmap
    };

    overlayMaps = {
        "Earthquakes": earthquakeLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);
    addLegend(map);
};

function createMarkers(response) {
    earthquakes = response.features;
    earthquakeMarkers = [];

    earthquakes.forEach(function(earthquake) {
        coords = earthquake.geometry.coordinates;
        mag = earthquake.properties.mag;
        depth = coords[2];

        color = getColor(depth);
        marker = L.circle([coords[1], coords[0]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.75,
            radius: Math.pow(mag, 2) * 5000
        }).bindPopup(`<h3>Magnitude: ${mag}</h3><p>Depth: ${depth} km</p>`);

        earthquakeMarkers.push(marker);
    });

    earthquakeLayer = L.layerGroup(earthquakeMarkers);
    createMap(earthquakeLayer);
}

function getColor(depth) {
    if (depth > 300) {
        return 'darkred';
    } else if (depth > 200) {
        return 'red';
    } else if (depth > 100) {
        return 'orange';
    } else if (depth > 50) {
        return 'gold';
    } else if (depth > 20) {
        return 'yellow';
    } else if (depth > 0) {
        return 'lightyellow';
    } else {
        return 'white';
    }
}

fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(function(response) { return response.json(); })
    .then(createMarkers);

function addLegend(map) {
    legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function() {
        div = L.DomUtil.create('div', 'info legend');
        div.style.background = 'lightgrey'
        div.style.border = '1px solid black';
        labels = [
                '<i style="background:darkred; width: 18px; height: 18px; display: inline-block;"></i> > 300 km',
                '<i style="background:red; width: 18px; height: 18px; display: inline-block;"></i> 200-300 km',
                '<i style="background:orange; width: 18px; height: 18px; display: inline-block;"></i> 100-200 km',
                '<i style="background:gold; width: 18px; height: 18px; display: inline-block;"></i> 50-100 km',
                '<i style="background:yellow; width: 18px; height: 18px; display: inline-block;"></i> 20-50 km',
                '<i style="background:lightyellow; width: 18px; height: 18px; display: inline-block;"></i> < 20 km'
            ];
    
            div.innerHTML = labels.join('<br>');
            return div;
        };
    
        legend.addTo(map);
    }