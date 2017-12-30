var socket = io();
socket.on("connect", function(){
    console.log("Connected to Server !!");
    socket.emit("createMessage", { 
        from:"Senthil",      
        text:"Hello Server!!",
        createdAt:new Date()
    });
});

socket.on("disconnect", function(){
    console.log("Disconnected from server!!");
});

socket.on("newMessage", (message)=>{
    console.log(message);
});