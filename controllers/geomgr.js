var db = require('../dbhelper.js');
var q = require('../querybuilder.js');
var commands = q.commands;
var tables = q.tables;

function addGeoEntry(ji){
    var o = {
        command: commands.insert,
        tableName: tables.geo.tableName,
        cols: tables.geo.allExceptID(),
        values: [ji.userID, ji.groupID, ]

    };
}

function updateGeoEntry(index){

}

function removeGeoEntry(index){

}

function getGeoEntriesByUser(userID){
    
}

function getGeoEntriesByGroup(groupID){

}

module.exports = {
    addGeoEntry: addGeoEntry,
    updateGeoEntry: updateGeoEntry,
    removeGeoEntry: removeGeoEntry,
    getGeoEntriesByUser: getGeoEntriesByUser,
    getGeoEntriesByGroup: getGeoEntriesByGroup
};