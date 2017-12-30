const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const { generateMessage , generateLocationMessage} = require("./utils/message.js");

var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = SocketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {

    socket.emit("newMessage", generateMessage("Admin", "Welcome to chat App!!"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user has joined !!"));

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("Server has received message successfully!!");
    });

    socket.on("createLocationMessage", (coords, callback) => {
        io.emit("newLocationMessage", generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from Client!!");
    });

});

server.listen(port, () => {
    console.log(`App running at port ${port}`);
});