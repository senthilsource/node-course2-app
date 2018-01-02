const expect = require("expect");

const {isRealString} = require("./validation");

describe("isRealString", ()=>{
    it("Proper values should return true", ()=>{
        var name = "Admin";
        var room = "Hello";
        var result = isRealString(name);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
        result = isRealString(room);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    it("Empty String should return false", ()=>{
        var name = "";
        var room = "";
        var result = isRealString(name);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(false);
        result = isRealString(room);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(false);
    });

    it("Empty String with space should return false", ()=>{
        var name = "   ";
        var room = "   ";
        var result = isRealString(name);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(false);
        result = isRealString(room);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(false);
    });
});