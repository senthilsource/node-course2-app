var socket = io();

function scrollToBottom(){
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");

    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function(){
    var params = $.deparam(window.location.search);

    socket.emit("join", params, function(err){
        if(err){
            alert("Name and room is not correct");
            window.location.href="/";
        }else{
            console.log("Joined");
        }
    });
});

socket.on("updateUsersList", (users)=>{
    var ol = $("<ol></ol>");

    users.forEach((user)=>{
        ol.append($("<li></li>").text(user));       
    });

    $("#users").html(ol);
});

socket.on("disconnect", function(){
    console.log("Disconnected from server!!");
});

socket.on("newMessage", (message)=>{
    var messageCreatedAt = moment(message.createdAt).format("h:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        createdAt: messageCreatedAt
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", (message)=>{
    var messageCreatedAt = moment(message.createdAt).format("h:mm a");
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        from:message.from,
        url:message.url,
        createdAt: messageCreatedAt
    });
    $("#messages").append(html);
    scrollToBottom();
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