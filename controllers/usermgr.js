var db = require('../dbhelper.js');
var q = require('../querybuilder.js');
var uuid = require('uuid/v4');
var users = q.tables.users;
var commands = q.commands;

function addUser(ji){
    /**
     * Expects:
     *  jsonInput = {
     *      username: (string containing username)
     *      password: (string containing password)
     *      email: (string containing email)
     *      dateJoined: (string containing a valid DateTime)
     *      user_type: (integer which denotes the user type)
     *  }
     */

     var o = {
         command: commands.insert,
         tableName: users.tableName,
         cols: users.allExceptID(),
         values: ["'" + ji.username + "'", "'" + ji.password + "'", "'" + ji.email + "'", "'" + ji.dateJoined + "'", null, null, ji.user_type,"'" + uuid() + "'"]
     }

     return db.query(q.buildQuery(o));
}

function getUser(userID){
    var o = {
        command: commands.select,
        tableName: users.tableName,
        cols: users.all(),
        where: users.user_id() + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function removeUser(userID){
    var o = {
        command: commands.delete,
        tableName: users.tableName,
        where: users.user_id + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function updateUser(ji){
    var o = {
        command: commands.update,
        tableName: users.tableName,
        cols: ji.cols,
        values: ji.values,
        where: ji.where 
    };

    return db.query(q.buildQuery(o));
}

function getUsersInGroup(groupID){
    var o = {
        command: commands.select,
        tableName: users.tableName,
        cols: users.all(),
        where: users.associated_groups() + "='" + groupID + "'"
    }

    return db.query(q.buildQuery(o));
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
exports.getUsersInGroup = getUsersInGroup;