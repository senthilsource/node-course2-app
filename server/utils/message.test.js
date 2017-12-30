const expect = require("expect");

var {generateMessage} = require("./message.js");

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
})