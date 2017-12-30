var socket = io();
socket.on("connect", function(){
    console.log("Connected to Server !!");
});

socket.on("disconnect", function(){
    console.log("Disconnected from server!!");
});

socket.on("newMessage", (message)=>{
    console.log(message);
    var li = $("<li/>");
    li.text(`${message.from} : ${message.text}`);
    $("#messages").append(li);
});

// socket.emit("createMessage", {
//     from:"Test",
//     text:"Hi"
// }, (results)=>{
//     console.log(results);
// });

$("#message-form").on("submit", function(e){
    e.preventDefault();
    socket.emit("createMessage", {
        from:"User 1",
        text:$('input[name=message]').val()
    }, (results)=>{
        console.log(results);
    });
});