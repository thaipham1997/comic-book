var jwt = require('./../utils/jwt');
var fs = require('fs');
var path = require('path');
var authDao = require('../dao/auth.dao');

exports.auth = function () {
    return function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token).then(function (decodedData) {

                    var name = decodedData.username;
                    authDao.findOne({
                            username: name
                        })
                        .then(function (user) {
                            req.user = user;
                            next();
                        })
                        .catch(function (err) {
                            next({status_code: 404, message: "user not found"})
                        })
                })
                .catch(function (err) {
                    res.status(401);
                    res.json({
                        message: 'Invalid Token'
                    });
                })
        } else {
            res.status(401);
            res.json({
                message: "Not Authorized"
            });
        }
    }
}