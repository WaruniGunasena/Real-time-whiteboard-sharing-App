const { Socket } = require("dgram");
const express = require("express");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

//routes
app.get("/",(req,res) => {
  res.send("This is mern realtime whiteboard sharing app official server by Waruni Gunasena");
})

io.on("connection", (socket) => {
  console.log("User connected");
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log("server is running on http://localhost:5000"));