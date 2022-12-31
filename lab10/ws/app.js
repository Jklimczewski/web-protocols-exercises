'use strict';
const connect = require("connect");
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer);

app.use(serveStatic("public"));

// io.on("connection", function (socket) {
//     console.log("user connected");
//     socket.on("test", function (msg) {
//         console.log(msg);
//     });
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });
const users = [];

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const id = socket.id
        users.push({id, username, room});
  
        socket.join(room);
  
      // Broadcast everytime users connects
        socket.broadcast
            .to(room)
            .emit('message', `${username} has joined the room`);
    });
  
    // Listen for client message
    socket.on('chatMessage', msg => {
      const user = users.find(user => user.id === socket.id);
      io.to(user.room).emit('message', `${user.username}: ${msg}`);
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
        const index = users.findIndex(user => user.id === socket.id);
        const user = users.splice(index, 1)[0];
  
        io.to(user.room).emit(
          'message', `${user.username} has left the room`);
    });
  });

httpServer.listen(3000, function () {
 console.log('Serwer HTTP działa na pocie 3000');
});
