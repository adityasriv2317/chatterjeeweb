const { Server } = require("socket.io");

module.exports = (req, res) => {
  if (req.method === "GET") {
    res.status(200).send("Socket.IO server");
  }

  const io = new Server(res.socket.server);
  
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      io.emit("message", data);
    });
  });

  res.socket.server.io = io;
  res.status(200).end();
};
