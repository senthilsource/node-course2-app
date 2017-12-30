const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const {generateMessage} = require("./utils/message.js");

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
    });

    socket.emit("newMessage", generateMessage("Admin", "Welcome to chat App!!"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user has joined !!"));

    socket.on("createMessage", (message, callback)=>{
        console.log(message);
        io.emit("newMessage",generateMessage(message.from,message.text));
        callback("Server has received message successfully!!");
        // socket.broadcast.emit("newMessage", {
        //     from:message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // })
    });
   
});

server.listen(port, ()=>{
    console.log(`App running at port ${port}`);
});