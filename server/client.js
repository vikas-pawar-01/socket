const app = require("express")();
const httpServer = require("http").createServer(app);

const io = require("socket.io-client");

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("Client socket: #", socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log("Client Socket Disconnected #", socket.id); // undefined
});

socket.on("hello", (arg) => {
  console.log(arg); // world
});

socket.emit("hello", "Pawar");

httpServer.listen(3000);
