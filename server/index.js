const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Attach Express to an HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Allow requests from any origin
    },
});

// Define a simple route
app.get('/', (req, res) => {
    res.send("Server is running");
});

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

// Handle Socket.io connections
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    socket.on("join-room", (data) => {
        const {email,room} = data;
        emailToSocketId.set(email, socket.id);  
        socketIdToEmail.set(socket.id, email); 
        io.to(room).emit("user-joined",{email,id:socket.id});
        socket.join(room);
        io.to(socket.id).emit("joined-room",data);               
    });
});


// Start the server on port 8000
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
