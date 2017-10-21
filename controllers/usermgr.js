var db = require('../dbHelper.js');
var q = require('../querybuilder.js');
var tables = q.tables;
var commands = q.commands;

function addUser(jsonInput){

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