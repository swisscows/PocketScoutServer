var db = require('../dbHelper.js');
var q = require('../querybuilder.js');
var uuid = require('uuid/v4');
var tables = q.tables;
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
         tableName: tables.users.tableName,
         cols: tables.users.allExceptID(),
         values: ["'" + ji.username + "'", "'" + ji.password + "'", "'" + ji.email + "'", "'" + ji.dateJoined + "'", null, null, ji.user_type,"'" + uuid() + "'"]
     }

     return db.query(q.buildQuery(o));
}

function getUser(userID){
    var o = {
        command: commands.select,
        tableName: tables.users.tableName,
        cols: tables.users.all(),
        where: tables.users.user_id() + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function removeUser(userID){

}

function updateUser(jsonInput){

}

function getUsersInGroup(groupID){
    var o = {
        command: commands.select,
        tableName: tables.users.tableName,
        cols: tables.users.all(),
        where: tables.users.associated_groups() + "='" + groupID + "'"
    }

    return db.query(q.buildQuery(o));
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
exports.getUsersInGroup = getUsersInGroup;