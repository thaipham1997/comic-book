var userDAO = require('../dao/auth.dao')
module.exports = function() {
    checkAdm : CheckAdm
}

function CheckAdm() {
    return function(req , res ,next) {
        var user = req.body;

        if(user._role = 'reader') {
            return 0;
        }
        else{
            return 1;
        }
    }
}