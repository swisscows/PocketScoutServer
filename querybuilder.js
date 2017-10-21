const commands = {
    select: "SELECT",
    insert: "INSERT",
    delete: "DELETE",
    update: "UPDATE"
};

const tables = {
    users: {
        tableName: "ps_users",
        all: function(){
            return ["id", "username", "password", "email", "dateJoined", "associated_groups", "security_token", "fk_user_type", "user_id"];
        },
        allExceptID: function () {
            return this.all().filter(function (c, i, a) {
                return i != 0;
            });
        },
        id: function () {
            return this.all()[0];
        },
        username: function () {
            return this.all()[1];
        },
        password: function () {
            return this.all()[2];
        },
        email: function () {
            return this.all()[3];
        },
        datejoined: function () {
            return this.all()[4];
        },
        associated_groups: function () {
            return this.all()[5];
        },
        security_token: function () {
            return this.all()[6];
        },
        user_type: function () {
            return this.all()[7];
        },
        user_id: function () {
            return this.all()[8];
        },
    },
    usertypes: {
        tableName: "ps_usertypes",
        all: function(){
            return ["id", "name", "level"];
        },
        allExceptID: function () {
            return this.all().filter(function (c, i, a) {
                return i != 0;
            });
        },
        id: function () {
            return this.all()[0];
        },
        name: function () {
            return this.all()[1];
        },
        level: function () {
            return this.all()[2];
        },
    },
    geo: {
        tableName: "ps_geo",
        all: function(){
            return ["id", "user_id", "group_id", "lat", "long", "datetime"];
        },
        allExceptID: function(){
            return this.all().filter(function(c, i, a){
                return (i != 0);
            });
        },
        id: function(){
            return this.all()[0];
        },
        userID: function(){
            return this.all()[1];
        },
        groupID: function(){
            return this.all()[2];
        },
        latitude: function(){
            return this.all()[3];
        },
        longitude: function(){
            return this.all()[4];
        },
        datetime: function(){
            return this.all()[5];
        }
    },
    campinglist: {
        tableName: "ps_campinglist"
    },
    messages: {
        tableName: "ps_messages"
    },
    invites: {
        tableName: "ps_invites"
    }
};

function buildQuery(options) {
    /**
     * Expected properties based on command:
     * 
     * SELECT:
     *      command: (the command, commands.select)
     *      tableName: (the name of the table to select from, tables.[THE_TABLE_YOU_WANT].tableName)
     *      cols: (the columns to select from, this is an array of strings)
     *      where: (A string to be placed exactly after the WHERE keyword)
     * 
     * INSERT:
     *      command: (the command, commands.insert)
     *      tableName: (the name of the table to insert into, tables.[THE_TABLE_YOU_WANT].tableName)
     *      cols: (the columns to insert into, this is an array of strings)
     *      values: (the values you want to add in the same order as the columns were specified. This is a mixed type array where the type matches that of the column it is being inserted into)
     * 
     * DELETE:
     *      command: (the command, commands.delete)
     *      tableName: (the name of the table to delete from, tables.[THE_TABLE_YOU_WANT].tableName)
     *      where: (a string which is evaluated by the DB to determine what to delete ex. WHERE (thisCol=thisValue))
     * 
     * UPDATE:
     *      command: (the command, commands.update)
     *      tableName: (the name of the table to update, tables.[THE_TABLE_YOU_WANT].tableName)
     *      cols: (the columns you would like to update, this is an array of strings)
     *      values: (the updated values for the columns, this is also an array of strings matching one-to-one with cols)
     *      where: (a string which is evaluated by the DB to determine what to update ex. WHERE (thisCol=thisValue))
     */

     // SELECT
    if (options.command == commands.select) {
        if(options.tableName == null || options.tableName == "" || options.cols == null || options.cols == [] || options.where == null || options.where == ""){
            console.log("Could not build query, invalid parameters provided");
            return null;
        }
        
        var result = commands.select;
        result += " (";
        options.cols.forEach(function (c, i, a) {
            if (a.length - 1 == i) {
                result += c + ")";
            } else {
                result += c + ", ";
            }
        });
        result += " FROM " + options.tableName + " WHERE ";
        result += options.where + ";";
        return result;
    // INSERT
    } else if (options.command == commands.insert) {
        var result = commands.insert + " INTO ";
        result += options.tableName + " (";
        options.cols.forEach(function (c, i, a) {
            if (i == a.length - 1) {
                result += c + ")";
            } else {
                result += c + ", ";
            }
        });
        result += " VALUES (";
        options.values.forEach(function (c, i, a) {
            if (i == a.length - 1) {
                result += c + ")";
            } else {
                result += c + ", ";
            }
        });
        result += ";";
        return result;
    // DELETE
    }else if(options.command == commands.delete){
        var result = options.command + " FROM " + options.tableName + " WHERE (";
        result += options.where + ");";
        return result;
    // UPDATE
    }else if(options.command == commands.update){
        if(options.cols.length != options.values.length){
            console.log("COL and VALUE properties must be the same size");
            return null;
        }
        var result = options.command + " " + options.tableName + " SET ("
        options.cols.forEach(function(c, i, a){
            if(i == a.length-1){
                result += options.cols[i] + "=" + options.values[i] + ")";
            }else{
                result += options.cols[i] + "=" + options.values[i] + ", ";
            }
        });

        result += " WHERE (" + options.where + ");";
        return result;
    // INVALID
    }else{
        return null;
    }
}

function cleanInputs(vals) {
    var newMap = vals.map(function (curr, index, arr) {
        return curr.replace(/\W/g, "");
    });
    return newMap;
}

exports.commands = commands;
exports.tables = tables;
exports.cleanInputs = cleanInputs;
exports.buildQuery = buildQuery;