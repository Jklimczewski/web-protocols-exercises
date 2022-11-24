const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')


client.on('connect', function () {
    console.log("ConnectedServer");
    client.subscribe('salonTemp');
    client.subscribe('bedroomTemp');
});

client.on('message', function (topic, message) {
  console.log(topic + " -> " + message.toString());
})