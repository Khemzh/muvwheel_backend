const test = require("./test")

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    var x = test.testa()
    res.send(x);
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});