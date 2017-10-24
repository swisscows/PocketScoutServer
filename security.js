var crypto = require("crypto-js/sha256");
var uuid = require('uuid/v4');

function hashPassword(p){
    return crypto("Hash ME", "key");
}



module.exports = {
    hashPassword: hashPassword
};