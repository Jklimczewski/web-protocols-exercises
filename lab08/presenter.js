const fs = require('fs')
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
    console.log("ConnectedPresenter");
    client.subscribe('salonTemp');
    client.subscribe('bedroomTemp');
    client.subscribe('heating');
});

client.on('message', function (topic, message) {
    fs.writeFile('db.txt', topic + " -> " + message.toString() + '\n', { flag: 'a' }, (err) => {
        if (err) throw err
    });
})