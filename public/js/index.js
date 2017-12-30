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

socket.on("newLocationMessage", (message)=>{
    var li = $("<li/>");
    var a = $("<a target='_blank'>My Location</a>");    
    li.text(`${message.from} : `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", function(e){
    e.preventDefault();
    socket.emit("createMessage", {
        from:"User 1",
        text:$('input[name=message]').val()
    }, (results)=>{
        console.log(results);
    });
});

var locationButton = $("#send-location");
locationButton.on("click", function(){
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser!");
    }
   navigator.geolocation.getCurrentPosition(function (position){
    socket.emit("createLocationMessage", {
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    });
   }, function(){
        alert("Unable to get location co-ordinates");
   }) ;
});