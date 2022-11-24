const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

let heating = true;

client.on('connect', function () {
    console.log("ConnectedHeatingBedroom");
    client.subscribe('bedroomTemp');
});

client.on('message', function (topic, message) {
    if (parseInt(message.toString()) > 25) {
        heating = false;
        client.publish("salonTemp", `heatingBedroom: ${heating}`)
    }
    else if (parseInt(message.toString()) <= 25) {
        heating = true;
        client.publish("salonTemp", `heatingBedroom: ${heating}`)
    }
    else {
        console.log("Got a Wrong message")
    }
})