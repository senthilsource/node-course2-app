const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
var publicPath = path.join(__dirname, "../public");

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = SocketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
    console.log("Connected to Socket");
    socket.on("disconnect", ()=>{
        console.log("Disconnected from Client!!");
    })
});

server.listen(port, ()=>{
    console.log(`App running at port ${port}`);
});