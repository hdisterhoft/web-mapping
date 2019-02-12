var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


d3.json(url, function(data) {
    createFeatures(data.features);
  });

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
    
    

    L.geoJson(earthquakeData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.text_on_sign);
        },
    
        /*
         * When each feature is loaded from the GeoJSON this
         * function is called. Here we create a cicle marker
         * for the feature and style the circle marker.
         */
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                // Stroke properties
                color: '#5EA4D4',
                opacity: 0.75,
                weight: 2,
    
                // Fill properties
                fillColor: '#5EA4D4',
                fillOpacity: 0.25,
    
                radius: "something related to magnitude"
            });
        }
    })

    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    createMap(earthquakes);
}
 
  function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
    
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
  
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
