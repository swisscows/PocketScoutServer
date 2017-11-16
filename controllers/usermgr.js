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
    /**
     * Expects: 
     * 
     * userID = a string containing the user's user_id
     */

    var o = {
        command: commands.select,
        tableName: users.tableName,
        cols: users.all(),
        where: users.user_id() + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function getUserWithCredentials(user, pass){
    var o = {
        command: commands.select,
        tableName: tables.users.tableName,
        cols: tables.users.user_id(),
        where: tables.users.username() + "='" + user + "' AND " + tables.users.password() + "='" + pass + "'"
    };

    return db.query(q.buildQuery(o));
}

function removeUser(userID){
    /**
     * Expects:
     * 
     * userID = a string containing the user's user_id
     */
    var o = {
        command: commands.delete,
        tableName: users.tableName,
        where: users.user_id() + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function updateUser(ji){
    /**
     * Expects:
     * 
     * jsonObject = {
     *      cols: an array of strings which correspond to column names in the database
     *      values: a mixed type 1to1 array of the values to go in the columns provided
     *      where: a string which will be inserted directly after the WHERE keyword in the query
     * }
     */

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
    /**
     * Expects:
     * 
     * groupID = a string containing the group's group_id
     */
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
exports.getUserWithCredentials = getUserWithCredentials;