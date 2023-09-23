import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  let socket;

  socket = io("http://localhost:8000");

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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client socket: #", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Client Socket Disconnected #", socket.id);
    });

    socket.on("hello", (arg) => {
      console.log(arg); // world
    });
    const interval = setInterval(() => {
      socket.emit("hello", "Message Sent from Client: " + getDateTime());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = () => {
    socket.emit(
      "hello",
      "Message Sent from Client - Button Clicked: " + getDateTime()
    );
  };

  return (
    <div className="App">
      Socket Client
      <button type="submit" className="button green" onClick={sendMessage}>
        Submit
      </button>
    </div>
  );
}

export default App;
