var db = require('../dbhelper.js');
var q = require('../querybuilder.js');
var commands = q.commands;
var tables = q.tables;

function addGeoEntry(ji) {
    var o = {
        command: commands.insert,
        tableName: tables.geo.tableName,
        cols: tables.geo.allExceptID(),
        values: [ji.userID, ji.groupID, ji.lat, ji.long, ji.time]
    };

    return db.query(q.buildQuery(o));
}

function updateGeoEntry(ji) {
    var o = {
        command: commands.update,
        tableName: tables.geo.tableName,
        cols: tables.geo.allExceptID(),
        values: [ji.userID, ji.groupID, ji.lat, ji.long, ji.time],
        where: tables.geo.userID() + "='" + ji.userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function removeGeoEntry(userID) {
    var o = {
        command: commands.delete,
        tableName: tables.geo.tableName,
        where: tables.geo.userID() + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function getGeoEntriesByUser(userID) {
    var o = {
        command: commands.select,
        tableName: tables.geo.tableName,
        cols: tables.geo.all(),
        where: tables.geo.userID() + "='" + userID + "'"
    };

    return db.query(q.buildQuery(o));
}

function getGeoEntriesByGroup(groupID) {
    var o = {
        command: commands.select,
        tableName: tables.geo.tableName,
        cols: tables.geo.all(),
        where: tables.geo.groupID() + "='" + groupID + "'"
    };

    return db.query(q.buildQuery(o));
}

function getGeoEntriesForUserSinceDate(userID, date){
    var o = {
        command: commands.select,
        tableName: tables.geo.tableName,
        cols: tables.geo.all(),
        where: tables.geo.userID() + "='" + userID + "' AND " + tables.geo.datetime() + ">" + date
    };

    return db.query(q.buildQuery(o));
}

function getGeoEntriesForGroupSinceDate(groupID, date){
    var o = {
        command: commands.select,
        tableName: tables.geo.tableName,
        cols: tables.geo.all(),
        where: tables.geo.groupID() + "='" + groupID + "' AND " + tables.geo.datetime() + ">" + date
    };

    return db.query(q.buildQuery(o));
}

function getGeoEntriesByUserBetween(userID, startDate, endDate){
    var o = {
        command: commands.select,
        tableName: tables.geo.tableName,
        cols: tables.geo.allExceptID(),
        where: tables.geo.userID() + "='" + userID + "' AND " + tables.geo.datetime() + ">" + startDate + " AND " + tables.geo.datetime() + "<" + endDate
    };

    return db.query(q.buildQuery(o));
}

function getGeoEntriesByGroupBetween(groupID, startDate, endDate){
    var o = {
        command: commands.select,
        tableName: tables.geo.tableName,
        cols: tables.geo.allExceptID(),
        where: tables.geo.groupID() + "='" + groupID + "' AND " + tables.geo.datetime() + ">" + startDate + " AND " + tables.geo.datetime() + "<" + endDate
    };

    return db.query(q.buildQuery(o));
}

module.exports = {
    addGeoEntry: addGeoEntry,
    updateGeoEntry: updateGeoEntry,
    removeGeoEntry: removeGeoEntry,
    getGeoEntriesByUser: getGeoEntriesByUser,
    getGeoEntriesByGroup: getGeoEntriesByGroup
};