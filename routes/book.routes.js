var router = require('express').Router();
var fs = require("fs");
var path = require('path');
var jwt = require('./../utils/jwt');
var bookController = require('../controller/book.controller');

module.exports = function () {
    router.post('/addnewbook' , bookController.addBook);
    router.post('/getallbook' , bookController.getBook);
    router.post('/findbookbyid' , bookController.findBookId);
    router.post('/deletebook' , bookController.deleteBookById);
    router.post('/addchap' , bookController.insertChapBook);
    // router.post('/addchap' , bookController.addChap);
    return router;
};