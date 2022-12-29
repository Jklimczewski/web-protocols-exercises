const https = require("https");
const http = require("http")
const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const app_tls = express();

const key = fs.readFileSync('C:/Users/kuba/test_key')
const cert = fs.readFileSync('C:/Users/kuba/test_certyfikat')
const options = {key: key, cert: cert};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app_tls);

app.use(bodyParser.urlencoded({ extended: false }));
app_tls.use(bodyParser.urlencoded({ extended: false }));


httpServer.listen(8080, () => {
  console.log("server running at port 8000");
});

httpsServer.listen(8443, () => {
  console.log("server running at port 8443");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

app.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

app_tls.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

app_tls.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});