import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
    autoConnect: false
  });

socket.on("connect", () => {
    console.log(socket.id,"connected"); 
  });

socket.on("disconnect", () => {
    console.log("disconnected"); 
  });
export { socket };