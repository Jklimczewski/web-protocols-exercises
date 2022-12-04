const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

let heating = true;

client.on('connect', function () {
    console.log("ConnectedHeatingBedroom");
    client.subscribe('adjustbedroomTemp');
});

client.on('message', function (topic, message) {
    if (message.toString() == "HEAT") {
        heating = true;
        client.publish("heating", `heatingBedroom: ${heating}`)
    }
    else if (message.toString() == "CHILL") {
        heating = false;
        client.publish("heating", `heatingBedroom: ${heating}`)
    }
    else {
        console.log("Got a Wrong message");
    }
})