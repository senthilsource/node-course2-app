const expect = require("expect");

const {Users} = require("./users");

describe("Users", ()=>{

    var users;

    beforeEach(()=>{
        users = new Users();
        users.users =[{
            id:"1",
            name:"senthil",
            room:"Node 1"
        },{
            id:"2",
            name:"kumar",
            room:"Node 2"
        },
        {
            id:"3",
            name:"sk",
            room:"Node 1"
        }];
    });
    

    it("Should add new user", ()=>{
        var users = new Users();
        var user = {
            id:"123",
            name:"Senthil",
            room:"The new room"
        };

        var newUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("Should return list of users for Node 1", ()=>{
        var userNameArray = users.getUserList("Node 1");

        expect(userNameArray).toEqual(["senthil","sk"]);
    });

    it("Should return list of users for Node 2", ()=>{
        var userNameArray = users.getUserList("Node 2");

        expect(userNameArray).toEqual(["kumar"]);
    });

    it("Should find user", ()=>{
        var userId = "1";
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it("Should not return user", ()=>{
        var userId = "4";
        var user = users.getUser(userId);

        expect(user).not.toBeDefined(undefined);
    });

    it("Should remove user", ()=>{
        var userId = "1";
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("Should Not remove user", ()=>{
        var userId = "5";
        var user = users.removeUser(userId);

        expect(user).not.toBeDefined(undefined);
        expect(users.users.length).toBe(3);
    });
});