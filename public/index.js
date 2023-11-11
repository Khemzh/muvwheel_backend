const map_api = require("./map_api")

const express = require('express');
const app = express();
const port = 3000;

var num = 2;

if (num == 1) {
    app.get('/', (req, res) => {
        var x = map_api.renderMap()
        res.send(x);
    });
} else if (num == 2) {
    app.get('/', (req, res) => {
        var y = map_api.initMaps()
        res.send(y);
    });
}

/* app.get('/', (req, res) => {
    var x = map_api.renderMap()
    res.send(x);
}); */

/* app.get('/', (req, res) => {
    var y = map_api.initMaps()
    res.send(y);
}); */

/* app.get('/', (req, res) => {
    var z = map_api.renderMapLeafLet()
    res.send(z);
}); */

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});