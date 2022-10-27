const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send("Get request appearing\n");
});

app.post('/', (req, res) => {
    res.send("Posting appearing\n");
})

app.listen(3001);