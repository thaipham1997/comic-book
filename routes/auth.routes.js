var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('./../utils/jwt');
var authController = require('../controller/auth.controller');
var bookController = require('../controller/book.controller');

module.exports = function () {
    router.post('/login', authController.login);
    router.post('/register', authController.register);
    router.post('/getuserbytoken', authController.getuserbytoken);
    router.post('/getalluser', authController.getuser);
    router.post('/finduserid', authController.findUserID);
    router.post('/upload', authController.upImage);
    return router;
};