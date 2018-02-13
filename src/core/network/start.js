const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 5000);




app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});


io.on('connection', function(socket) {
  console.log('connect' + socket);
});


setInterval(function() {
  io.sockets.emit('message', 'emit socket');
}, 1000);

