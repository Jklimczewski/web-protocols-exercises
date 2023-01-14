const express = require('express');
const https = require("https");
const fs = require("fs");

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/main"));

require("dotenv").config({path: "./config.env"});
const key = fs.readFileSync(process.env.KEY_PATH);
const cert = fs.readFileSync(process.env.CERT_PATH);
const options = {key: key, cert: cert};
const httpsServer = https.createServer(options, app);

const port = process.env.PORT || 5000;



// const dbo = require("./db/conn");

httpsServer.listen(port, ()=> {
    // dbo.connectToServer(function(err){
    //     if (err) console.error(err);
    // });
    console.log(`Server is running on ${port}`);
})