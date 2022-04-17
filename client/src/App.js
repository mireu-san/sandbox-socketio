import './App.css';
import io from 'socket.io-client';
// backend uses 3001, frontend uses 3000 port
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room state
  const [room, setRoom] = useState("");

  //Messages state
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return ( 
    <div className="App">
      <input
        placeholder="Room Number..."
        onCHange={(event) => {
          setRoom(event.target.value);
        }}
    />
    <button onClick={joinRoom}> Join Room</button>
    <input 
      placeholder="input any message" 
      onChange={(event) => {
        setMessage(event.target.value);
      }}
    />
    <button onClick={sendMessage}>Send!</button>
    <h1> Message: </h1>
    {messageReceived}
  </div>
  );
}

export default App;
