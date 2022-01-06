var board;
var game;

// Setup socket client
var socket = io(); // Se inicia conexión con el servidor

// window.onclick = function (e) {
//   socket.emit("message", "Hello wrold!");
// };
// Setup socket client /

window.onload = function () {
  initGame();
};
var initGame = function () {
  var cfg = {
    draggable: true,
    position: "start",
    onDrop: handleMove,
  };
  board = new ChessBoard("gameBoard", cfg);
  game = new Chess();
};

var handleMove = function (source, target) {
  var move = game.move({ from: source, to: target });
  if (move === null) return "snapback";
  // Enviar objeto del movimiento al servidor
  else socket.emit("move", move);
};

// Respuesta al cliente, del movimiento remitido previamente por el otro cliente,
// Cuando el servidor llama socket.broadcast("move")
socket.on("move", function (msg) {
  game.move(msg);
  board.position(game.fen()); // fen es el lienzo del tablero (se actualizan los estados, como estan en el server)
});
