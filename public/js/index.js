var socket = io();
socket.on("connect", function(){
    console.log("Connected to Server !!");
});

socket.on("disconnect", function(){
    console.log("Disconnected from server!!");
});

socket.on("newMessage", (message)=>{
    console.log(message);
    var messageCreatedAt = moment(message.createdAt).format("h:mm a");
    var li = $("<li/>");
    li.text(`${message.from} : ${messageCreatedAt} : ${message.text}`);
    $("#messages").append(li);
});

socket.on("newLocationMessage", (message)=>{
    var messageCreatedAt = moment(message.createdAt).format("h:mm a");
    var li = $("<li/>");
    var a = $("<a target='_blank'>My Location</a>");    
    li.text(`${message.from} : ${messageCreatedAt} :`);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", function(e){
    e.preventDefault();
    $("#send-message").attr("disabled", "disabled").text("Sending Message....");
    socket.emit("createMessage", {
        from:"User 1",
        text:$('input[name=message]').val()
    }, (results)=>{
        console.log(results);
        $('input[name=message]').val("");
        $("#send-message").removeAttr("disabled").text("Send")
    });
});

var locationButton = $("#send-location");
locationButton.on("click", function(){
    locationButton.attr("disabled", "disabled").text("Sending Location....");
    if(!navigator.geolocation){
        locationButton.removeAttr("disabled").text("Send Location");
        return alert("Geolocation not supported by your browser!");
    }
   navigator.geolocation.getCurrentPosition(function (position){
    socket.emit("createLocationMessage", {
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    });
    locationButton.removeAttr("disabled").text("Send Location");
   }, function(){
    locationButton.removeAttr("disabled").text("Send Location");
        alert("Unable to get location co-ordinates");
   }) ;
});