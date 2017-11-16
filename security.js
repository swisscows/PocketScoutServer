var crypto = require("crypto-js");
var uuid = require('uuid/v4');
var userManager = require('controllers/usermgr.js');

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

function checkCredentials(user, pass){
    var passHash = toSHA3Hash(pass);

    var user = userManager.getUserWithCredentials(user, passHash);

    if(user == null){
        
    }

}



module.exports = {
    hashPassword: hashPassword
};