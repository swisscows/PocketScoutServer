var expect = require('chai').expect;
var qBuilder = require('../querybuilder.js');

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
    
                expect(result).to.be.a("string").which.equals("SELECT (id, name, level) FROM ps_usertypes WHERE id=1;");
            });

            it("Should return a syntactically correct SELECT statement", function(){
                var options = {
                    command: qBuilder.commands.select,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.allExceptID(),
                    where: t.usertypes.level() + "=200"
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("SELECT (name, level) FROM ps_usertypes WHERE level=200;");
            });

            it("Should return a syntactically correct SELECT statement", function(){
                var options = {
                    command: qBuilder.commands.select,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.allExceptID(),
                    where: t.usertypes.name() + "=admin"
                };
    
                var result = qBuilder.buildQuery(options);
    
                expect(result).to.be.a("string").which.equals("SELECT (name, level) FROM ps_usertypes WHERE name=admin;");
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
                    where: t.users.associated_groups() + "=acc23ddf-6e67-425f-9462-f3d1d5fe44a9"
                }

                var result = qBuilder.buildQuery(options);
                expect(result).to.be.a("string").which.equals("DELETE FROM ps_users WHERE (associated_groups=acc23ddf-6e67-425f-9462-f3d1d5fe44a9);");
            });

            it("Should return a syntactically correct DELETE statement", function(){
                var options = {
                    command: qBuilder.commands.delete,
                    tableName: t.users.tableName,
                    where: t.users.email() + " LIKE sample.test@gmail.com"
                }

                var result = qBuilder.buildQuery(options);
                expect(result).to.be.a("string").which.equals("DELETE FROM ps_users WHERE (email LIKE sample.test@gmail.com);");
            });
        });

        describe("$UPDATE", function(){
            it("Should return a syntactically correct UPDATE statement", function(){
                var options = {
                    command: qBuilder.commands.update,
                    tableName: t.usertypes.tableName,
                    cols: t.usertypes.all(),
                    values: [4, "nameTest", 30],
                    where: t.usertypes.name() + "=admin"
                };

                expect(qBuilder.buildQuery(options)).to.be.a("string").which.equals("UPDATE ps_usertypes SET (id=4, name=nameTest, level=30) WHERE (name=admin);");
            });

            it("Should return a syntactically correct UPDATE statement", function(){
                var options = {
                    command: qBuilder.commands.update,
                    tableName: t.geo.tableName,
                    cols: t.geo.allExceptID(),
                    values: ["e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e", "ab338611-a6e2-428a-8744-0d01e8560b03", "34.2743", "10.3840", "2010-10-10 10:10:19"],
                    where: t.geo.userID() + "=e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e"
                };

                expect(qBuilder.buildQuery(options)).to.be.a("string").which.equals("UPDATE ps_geo SET (user_id=e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e, group_id=ab338611-a6e2-428a-8744-0d01e8560b03, lat=34.2743, long=10.3840, datetime=2010-10-10 10:10:19) WHERE (user_id=e46ba8c6-4d8c-42c8-b7f5-02482f01fe8e);");
            });
        });
    });
});