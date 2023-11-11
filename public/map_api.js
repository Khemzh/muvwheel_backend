const { Loader } = require("@googlemaps/js-api-loader");

//import { Loader } from "@googlemaps/js-api-loader"
//Loader = require("@googlemaps/js-api-loader")
let map;

async function initMap() {

    const loader = new Loader({
        apiKey: "AIzaSyCUP4lwuTEXSPnFmJIY_eGSEnOGDGPxMRg",
        version: "weekly"
    });
    
    loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");

        map = new Map(document.getElementById("map"), {
          center: { lat: 13.7563, lng: 100.5018 },
          zoom: 8,
        });
    });
}

function initMaps() {
    initMap();
}

function renderMap() {
    // Create a simple HTML page with a map container
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Google Maps Example</title>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUP4lwuTEXSPnFmJIY_eGSEnOGDGPxMRg&callback=initMap"
          async
          defer
        ></script>
        <script
         async
         defer>
          function initMap() {
            // Create a map centered at a specific location
            var map = new google.maps.Map(document.getElementById("map"), {
              center: { lat: 13.7563, lng: 100.5018 },
              zoom: 8,
            });
          }
        </script>
      </head>
      <body>
        <div id="map" style="height: 775px; width: 100%;"></div>
      </body>
    </html>`;

    return html;
}

//module.exports = {renderMap}
module.exports = {initMaps}