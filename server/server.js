const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const {isRealString} = require("./utils/validation");
const { generateMessage , generateLocationMessage} = require("./utils/message");
const {Users} = require("./utils/users");

var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = SocketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {

    socket.on("join", (params, callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){
            return callback("Name and room name are required");
        }

        socket.join(params.room);  // Adding user to the room (Sockets)
        users.removeUser(socket.id); 
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUsersList", users.getUserList(params.room));  // Update user list in all chat window of a selected room

        socket.emit("newMessage", generateMessage("Admin", "Welcome to chat App!!"));  // Send only to joined user
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined !!`)); // Send message to all users in the chat room

        callback();
    });

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("Server has received message successfully!!");
    });

    socket.on("createLocationMessage", (coords, callback) => {
        io.emit("newLocationMessage", generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit("updateUsersList", users.getUserList(user.room));  // Update user list in all chat window of a selected room
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left !!`));
        }

        console.log("Disconnected from Client!!");
    });

});

server.listen(port, () => {
    console.log(`App running at port ${port}`);
});