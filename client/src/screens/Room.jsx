import React, { useState, useEffect, useRef } from "react";
import { socket } from "../socket";

const Room = () => {
  const [userJoined, setUserJoined] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const videoRef = useRef(null); // Ref for the video element

  useEffect(() => {
    socket.on("user-joined", ({ email, id }) => {
      setUserJoined(email);
      setRemoteSocketId(id);
    });

    return () => {
      socket.off("user-joined");
    };
  }, []);

  const constraints = {
    audio: true,
    video: true,
  };

  const handleCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMyStream(stream);

      // Assign stream to the video element using ref
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Room</h2>
      {userJoined && (
        <div className="bg-green-100 p-4 rounded-lg shadow-md w-80">
          <p className="text-green-700">User {userJoined} has joined the room.</p>
          <button
            onClick={handleCall}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Call
          </button>
        </div>
      )}

      {/* Video element for displaying the local stream */}
      {myStream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted // Mute the local video to avoid audio feedback
          className="mt-4 border rounded-lg"
          style={{ width: "400px", height: "300px" }}
        />
      )}
    </div>
  );
};

export default Room;
