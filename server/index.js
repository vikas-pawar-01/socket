const internal = require("stream");

const app = require("express")();
const httpServer = require("http").createServer(app);

const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};

const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  console.log("Server socket #", socket.id);
});

io.on("connection", (socket) => {
  const interval = setInterval(() => {
    socket.emit("hello", "Message Sent from Server: " + getDateTime());
  }, 5000);
});

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg);
  });
});

httpServer.listen(8000);

// Helping Function
const getDateTime = () => {
  const currentdate = new Date();

  return (
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
};
