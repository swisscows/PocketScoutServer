var expect = require('chai').expect;
var qBuilder = require('../querybuilder.js');
var sinon = require('sinon');
var db = require('../dbhelper.js');

var userManager = require('../controllers/usermgr.js');
var geoManager = require('../controllers/geomgr.js');
var messagingManager = require('../controllers/messagingmgr.js');
var campingListManager = require('../controllers/campinglistmgr.js');


describe("UserManager", function(){
    describe("addUser", function(){
        it("Should call addUser once with correct parameters", function(){
            var stub = sinon.stub(db, "query");
            var spy = sinon.spy(userManager, "addUser");
            var o = {
                username: "user",
                password: "pass",
                email: "user@domain.com",
                dateJoined: "2010-10-10 10:10:10",
                user_type: 0
            };
    
            userManager.addUser(o);
    
            stub.restore();
            spy.restore();
            expect(spy.getCall(0).args[0]).to.deep.equal(o);
            expect(stub.calledOnce).is.true; 
        });
    });
    describe("getUser", function(){
        it("should query the database once for a user", function(){
           var stub = sinon.stub(db, "query");
           var spy = sinon.spy(userManager, "getUser");

           var userID = "a9eb2230-8a77-47f9-919f-77ba32780814";
           var o = {
               command: qBuilder.commands.select,
               tableName: qBuilder.tables.users.tableName,
               cols: qBuilder.tables.users.all(),
               where: qBuilder.tables.users.user_id() + "='a9eb2230-8a77-47f9-919f-77ba32780814'"
           };

            userManager.getUser(userID);

            stub.restore();
            spy.restore();
            expect(stub.calledOnce).is.true;
            expect(stub.getCall(0).args[0]).to.be.equal("SELECT " + "id, username, password, email, dateJoined, associated_groups, security_token, fk_user_type, user_id" + " FROM ps_users WHERE (user_id='a9eb2230-8a77-47f9-919f-77ba32780814');");
            expect(spy.calledOnce).is.true;
            expect(spy.getCall(0).args[0]).to.be.equal(userID);
        });
    });
    describe("getUsersInGroup", function(){
        it("should send one query to the database to retrieve all users in a group", function(){
            var stub = sinon.stub(db, "query");
            var spy = sinon.spy(userManager, "getUsersInGroup");

            var group_id = "4fb637f3-bee5-42e5-a754-0255af62e6a0";

            userManager.getUsersInGroup(group_id);

            stub.restore();
            spy.restore();
            expect(stub.calledOnce).is.true;
            expect(stub.getCall(0).args[0]).to.be.equal("SELECT " + "id, username, password, email, dateJoined, associated_groups, security_token, fk_user_type, user_id" + " FROM ps_users WHERE (associated_groups='4fb637f3-bee5-42e5-a754-0255af62e6a0');");
        });
    });
    describe("removeUser", function(){
        it("shoud query the database one time to delete a user entry", function(){
            var stub = sinon.stub(db, "query");
            var spy = sinon.spy(userManager, "removeUser");

            stub.restore();
            spy.restore();
        });
    });
});

describe("GeoManager", function(){

});

describe("CampingListManager", function(){
    
});

describe("MessagingManager", function(){
    
});

describe("QueryBuilder", function(){
    describe("#cleanInputs", function(){
        it("Should remove all non alpha-numeric characters from every string", function(){
            var validInputs = qBuilder.cleanInputs(["abc", "def", "gh!i", "j........kl", "m$%^&*n$&^o", "pqr", "s!!{}tu", "!#$^vwx", "yz=-"]);
            expect(validInputs).to.be.an("array").which.deep.equals(["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz"]);
        });

        it("Should return an empty array if the source array is empty", function(){
            var result = qBuilder.cleanInputs([]);
            expect(result).to.be.an("array").which.is.empty;
        });

        it("Should replace invalid entries with empty strings", function(){
            var result = qBuilder.cleanInputs(["abc", "def", "g!!!!@#$hi", "@$%^&", "!@#$&*", "@#$%^&", "xyz"]);
            expect(result).to.be.an("array").which.deep.equals(["abc", "def", "ghi", "", "", "", "xyz"]);
        });
    });

    describe("#buildQuery", function(){
        var t = qBuilder.tables;
        describe("$COMMAND_INDEPENDENT", function(){
            it("Should return null when given invalid params", function(){
                var options = {
                    command: "NOT A VALID COMMAND"
                };

                expect(qBuilder.buildQuery(options)).to.be.null;
            });

            it("Should return null when given invalid params", function(){
                var options = {
                    command: qBuilder.commands.select,
                    tableName: "",
                    cols: t.users.all(),
                    where: t.users.password + "=password"
                };

                expect(qBuilder.buildQuery(options)).to.be.null;
            });
        });

        describe("$SELECT", function(){
            it("Should return a syntactically correct SELECT statement", function(){
                var options = {
                    command: qBuilder.commands.select,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.all(),
                    where: t.usertypes.id() + "=1"
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("SELECT id, name, level FROM ps_usertypes WHERE (id=1);");
            });

            it("Should return a syntactically correct SELECT statement", function(){
                var options = {
                    command: qBuilder.commands.select,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.allExceptID(),
                    where: t.usertypes.level() + "=200"
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("SELECT name, level FROM ps_usertypes WHERE (level=200);");
            });

            it("Should return a syntactically correct SELECT statement", function(){
                var options = {
                    command: qBuilder.commands.select,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.allExceptID(),
                    where: t.usertypes.name() + "=admin"
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("SELECT name, level FROM ps_usertypes WHERE (name=admin);");
            });
        });

        describe("$INSERT", function(){
            it("Should return a syntactically correct INSERT statement", function(){
                var options = {
                    command: qBuilder.commands.insert,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.allExceptID(),
                    values: ["testNAme", "12000"]
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("INSERT INTO ps_usertypes (name, level) VALUES (testNAme, 12000);")
            });

            it("Should return a syntactically correct INSERT statement", function(){
                var options = {
                    command: qBuilder.commands.insert,
                    tableName: t.users.tableName,
                    cols: t.users.allExceptID(),
                    values: ["testNAme", "12000", "pickles", "picklerick", "morty", "summer"]
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("INSERT INTO ps_users (username, password, email, dateJoined, associated_groups, security_token, fk_user_type, user_id) VALUES (testNAme, 12000, pickles, picklerick, morty, summer);");
            });

            it("Should return a syntactically correct INSERT statement", function(){
                var options = {
                    command: qBuilder.commands.insert,
                    tableName: t.users.tableName,
                    cols: t.users.all(),
                    values: ["testNAme", "12000", "pickles", "picklerick", "morty", "summer"]
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("INSERT INTO ps_users (id, username, password, email, dateJoined, associated_groups, security_token, fk_user_type, user_id) VALUES (testNAme, 12000, pickles, picklerick, morty, summer);");
            });
        });
        
        describe("$DELETE", function(){
            it("Should return a syntactically correct DELETE statement", function(){
                var options = {
                    command: qBuilder.commands.delete,
                    tableName: t.users.tableName,
                    where: t.users.associated_groups() + "='acc23ddf-6e67-425f-9462-f3d1d5fe44a9'"
                }

                var result = qBuilder.buildQuery(options);
                expect(result).to.be.a("string").which.equals("DELETE FROM ps_users WHERE (associated_groups='acc23ddf-6e67-425f-9462-f3d1d5fe44a9');");
            });

            it("Should return a syntactically correct DELETE statement", function(){
                var options = {
                    command: qBuilder.commands.delete,
                    tableName: t.users.tableName,
                    where: t.users.email() + " LIKE 'sample.test@gmail.com'"
                }

                var result = qBuilder.buildQuery(options);
                expect(result).to.be.a("string").which.equals("DELETE FROM ps_users WHERE (email LIKE 'sample.test@gmail.com');");
            });

            it("Should return a syntactically correct DELETE statement", function(){
                var userID = "da8d6b17-8cd9-479f-b537-431d623b5331"
                var o = {
                    command: qBuilder.commands.delete,
                    tableName: t.users.tableName,
                    where: t.users.user_id() + "='" + userID + "'"
                };

                var result = qBuilder.buildQuery(o);
                expect(result).to.be.a("string").which.equals("DELETE FROM ps_users WHERE (user_id='da8d6b17-8cd9-479f-b537-431d623b5331');")
            });
        });

        describe("$UPDATE", function(){
            it("Should return a syntactically correct UPDATE statement", function(){
                var options = {
                    command: qBuilder.commands.update,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.all(),
                    values: [4, "nameTest", 30],
                    where: t.usertypes.name() + "='admin'"
                };

                expect(qBuilder.buildQuery(options)).to.be.a("string").which.equals("UPDATE ps_usertypes SET (id=4, name='nameTest', level=30) WHERE (name='admin');");
            });

            it("Should return a syntactically correct UPDATE statement", function(){
                var options = {
                    command: qBuilder.commands.update,
                    tableName: t.geo.tableName,
                    cols: t.geo.allExceptID(),
                    values: ["e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e", "ab338611-a6e2-428a-8744-0d01e8560b03", 34.2743, 10.3840, "2010-10-10 10:10:19"],
                    where: t.geo.userID() + "='e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e'"
                };

                expect(qBuilder.buildQuery(options)).to.be.a("string").which.equals("UPDATE ps_geo SET (user_id='e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e', group_id='ab338611-a6e2-428a-8744-0d01e8560b03', lati=34.2743, longi=10.384, time_entered='2010-10-10 10:10:19') WHERE (user_id='e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e');");
            });
        });
    });
});