const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
