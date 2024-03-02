import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("message", ({ message, roomId }) => {
    socket.broadcast.emit(`listen-message-${roomId}`, message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(8000, () => {
  console.log("listening on *:3000");
});
