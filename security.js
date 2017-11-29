var crypto = require("crypto-js");
var uuid = require('uuid/v4');
var db = require('./dbhelper.js');
var userManager = require('./controllers/usermgr.js');

function toSHA256Hash(p){
    var hash =  crypto.SHA256(p);
    return hash.toString(crypto.enc.Hex);
}

function toSHA512Hash(p){
    var hash =  crypto.SHA512(p);
    return hash.toString(crypto.enc.Hex);
}

function toMD5Hash(p){
    var hash =  crypto.MD5(p);
    return hash.toString(crypto.enc.Hex);
}

function toSHA3Hash(p){
    var hash =  crypto.SHA3(p, {outputLength: 256});
    return hash.toString(crypto.enc.Hex);
}

function requestToken(username, password){
    let user = userManager.getUserWithCredentials(username, toSHA3Hash(password));
    if(user != null){
        
    }
}



module.exports = {
    requestToken: requestToken,
    toSHA3Hash: toSHA3Hash
};