<<<<<<< Updated upstream
const test = require("./test")
=======
// const map_api = require("./map_api")
>>>>>>> Stashed changes

// const express = require('express');
// const app = express();
// const port = 3000;

<<<<<<< Updated upstream
app.get('/', (req, res) => {
    var x = test.testa()
    res.send(x);
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
=======
// var num = 2;

// if (num == 1) {
//     app.get('/', (req, res) => {
//         var x = map_api.renderMap()
//         res.send(x);
//     });
// } else if (num == 2) {
//     app.get('/', (req, res) => {
//         var y = map_api.initMaps()
//         res.send(y);
//     });
// }

// /* app.get('/', (req, res) => {
//     var x = map_api.renderMap()
//     res.send(x);
// }); */

// /* app.get('/', (req, res) => {
//     var y = map_api.initMaps()
//     res.send(y);
// }); */

// /* app.get('/', (req, res) => {
//     var z = map_api.renderMapLeafLet()
//     res.send(z);
// }); */

// app.listen(port, () => {
//     console.log(`Listening at http://localhost:${port}`);
// });


let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();
>>>>>>> Stashed changes
