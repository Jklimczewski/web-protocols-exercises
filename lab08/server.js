const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')


client.on('connect', function () {
    console.log("ConnectedServer");
    client.subscribe('salonTemp');
    client.subscribe('bedroomTemp');
});

client.on('message', function (topic, message) {
  if (parseInt(message.toString()) > 25) {
    client.publish(`adjust${topic}`, "CHILL");
  }
  else if (parseInt(message.toString()) <= 25) {
    client.publish(`adjust${topic}`, "HEAT");
  }
  else {
    console.log("Wrong message");
  }
})
