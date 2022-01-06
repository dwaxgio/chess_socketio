var express = require("express");
var app = express();
app.use(express.static("public"));
var http = require("http").Server(app);
var port = process.env.PORT || 3000;

// Setup socket server
var io = require("socket.io")(http);
// Setup socket server /

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/default.html");
});

http.listen(port, function () {
  console.log("listening on *: " + port);
});

// Setup socket server
// io.on("connection", function (socket) {
//   console.log("new connection");

//   socket.on("message", function (msg) {
//     console.log("Got message from client: " + msg);
//   });
// });

// para recibir move
// Cada vez que resiva un mensaje "move", lo va a transmitir a todos los clientes
io.on("connection", function (socket) {
  console.log("new connection");

  socket.on("move", function (msg) {
    socket.broadcast.emit("move", msg);
  });
});
// Setup socket server /
