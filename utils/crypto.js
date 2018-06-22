var crypto = require('crypto');

function genRandStr(string_length) {
    return crypto.randomBytes(64)
        .toString('base64')
        .slice(0, string_length)
        .replace(/\+/g, '0')
        .replace(/\//g, '0')
}

function genSalt() {
    return genRandStr(20);
}

function hashWithSalt(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 128, 'sha1').toString('base64');
}
function hashWithSaltAsync(password, salt) {
    return new Promise(function(resolve,reject){
        crypto.pbkdf2(password, salt, 1000, 128, 'sha1',function(err,hash){
            if(err){
                reject(err);
            } else {
                resolve(hash.toString('base64'));
            }
        });
    })
  
}


module.exports = {
    hashWithSalt: hashWithSalt,
    genSalt: genSalt,
    genRandStr: genRandStr,
    hashWithSaltAsync : hashWithSaltAsync
};