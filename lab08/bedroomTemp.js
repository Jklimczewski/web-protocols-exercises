const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

client.on('connect', function () {
    console.log("ConnectedBedroom");
    setInterval(() => {
        client.publish('bedroomTemp', getRandomInt(20,30).toString());
    }, 4000);
});