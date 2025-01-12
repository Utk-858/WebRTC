import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";


const Lobby = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [roomNo, setRoomNo] = useState("");

  const HandleRoomJoin = (data) => {
    const { email, roomNo } = data;
    navigate(`/room/${roomNo}`);
  };

  useEffect(() => {
    socket.on("joined-room", HandleRoomJoin);

    return () => {
      socket.off("joined-room");
    };
  },[socket,HandleRoomJoin]);

  function HandleJoin() {
    if (socket.connected) {
      socket.disconnect();
    }
    socket.connect();

    socket.emit("join-room", { email, roomNo });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Lobby</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-80"
        onSubmit={(e) => {
          e.preventDefault();
          HandleJoin();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Room No:</label>
          <input
            type="text"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default Lobby;
