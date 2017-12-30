const expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message.js");

describe("generateMessage", ()=>{
    it("Should return expected message", ()=>{
        var from = "Admin";
        var text = "Hello";
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from, text
        });
    });
});


describe("generateLocationMessage", ()=>{
    it("Should return expected Location message", ()=>{
        var from = "Admin";
        var latitude = 55.8562447;
        var longitude = -4.2729722;
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toMatchObject({
            from, url:`https://www.google.com/maps?q=${latitude},${longitude}`
        });
    });
})