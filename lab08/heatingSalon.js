const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

let heating = true;

client.on('connect', function () {
    console.log("ConnectedHeatingSalon");
    client.subscribe('salonTemp');
});

client.on('message', function (topic, message) {
    if (parseInt(message.toString()) > 25) {
        heating = false;
        client.publish("salonTemp", `heatingSalon: ${heating}`)
    }
    else if (parseInt(message.toString()) <= 25) {
        heating = true;
        client.publish("salonTemp", `heatingSalon: ${heating}`)
    }
    else {
        console.log("Got a Wrong message")
    }
})