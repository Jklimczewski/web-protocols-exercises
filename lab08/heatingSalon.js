const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

let heating = true;

client.on('connect', function () {
    console.log("ConnectedHeatingSalon");
    client.subscribe('adjustsalonTemp');
});

client.on('message', function (topic, message) {
    if (message.toString() == "HEAT") {
        heating = true;
        client.publish("heating", `heatingSalon: ${heating}`)
    }
    else if (message.toString() == "CHILL") {
        heating = false;
        client.publish("heating", `heatingSalon: ${heating}`)
    }
    else {
        console.log(message.toString());
    }
})