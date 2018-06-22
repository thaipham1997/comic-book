var fs = require('fs-extra');
var path = require('path');
var authDAO = require('../dao/auth.dao');
var jwt = require('./../utils/jwt');
var formidable = require('formidable');
var crypto = require('../utils/crypto');
var checkAdm = require('../middle-ware/checkadm');
const fileField = 'myfile';
const profileImgPath = './public/img/profile/';
const hostName = 'http://localhost:';
const port = 3000;
const profileImgPathUrl = '/img/profile/';
const maxImgFileSize = 1024 * 1024;
var multer = require('multer');
var fileUpload = require('express-fileupload');

/**
 * @api {post} /auth/login Login user
 * @apiGroup Auth
 * @apiName login
 * @apiSuccess {String} name  Name of the User.
 * @apiSuccess {String} username username of the User to login.
 * @apiSuccess {String} password password of the User to login.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token"
 *     }
 * @apiError UserNotFound The username or password was wrong
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
* @api {post} /auth/regist Register user
* @apiGroup Auth
* @apiName regist
* @apiSuccess {String} name  Name of the User.
* @apiSuccess {String} username   username of the User to login.
* @apiSuccess {String} password   password of the User to login.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "token"
*     }
* @apiError Requied The username or password was required
* 
* @apiErrorExample Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "UserRequired"
*     }
*/

module.exports = {
    register: register,
    login: login,
    getuserbytoken: getuserbytoken,
    getuser: getuser,
    findUserID: findUserID,
    upImage: upImage
}

function upImage(req, res, err) {
    // var dir = profileImgPath;
    // var imgUrl = req.body.image;
    // console.log(imgUrl);
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    // var upload = multer({
    //     storage: storage,
    //     limits: { fileSize: maxImgFileSize }
    // }).single('image');

    // fs.mkdirs(dir, function (err) {
    //     if (err) {
    //         return res.status(500).send('cannot make dir!');
    //     }
    //     upload(req, res, function (uploadError) {
    //         if (!req.file) {
    //             return res.status(403).send("file not found or file is more large!");
    //         }

    //         if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/gif') {
    //             return res.status(403).send("not image format!");
    //         }

    //         if (uploadError) {
    //             console.log(uploadError);
    //             return res.status(400).send({
    //                 message: 'error in uploading /n' + uploadError
    //             });
    //         }

    //         req.profileImageURL = imgUrl + "/" + req.file.filename;
    //         next();
    //     });
    // });

    const upload = multer({ storage: storage }).single('image');
    upload(req, res, (err) => {
        // const image = req.body.image;
        if (err) {
            console.log(err);
        } else {
            res.json({
                sucess: true,
                message: 'Image was uploaded successfully'
            });
        }
    });
    console.log(upload);
}

function findUserID(req, res, next) {
    var request = req.body._id;

    authDAO.findUserByID(request).then(user => {
        res.send(user);
    }).catch(err => {
        console.log(err);
    })
}

function getuser(req, res, next) {
    authDAO.getAllUser().then(user => {
        res.send(user);
    }).catch(err => {
        console.log(err);
    })
}

function register(req, res, next) {

    var userModel = req.body;

    var request = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        image: req.body.image
    }

    authDAO.createUser(request).then(user => {
        res.send(user)
    }).catch(err => {
        res.send('ERROR');
    })

    // kiem tra du lieu nguoi dung
    //     var errors = validateUserModel(userModel);
    //     var userModel = req.body;
    //     console.log(errors.length);
    //     if (errors.length > 0) {
    //         return next(errors);
    //     }

    //     authDAO.findOne({
    //             username: userModel.username
    //         })
    //         .then(function (user) {
    //             if (user) {
    //                 next({
    //                     status_code: 400,
    //                     message: "username is exist!"
    //                 });
    //             } else {
    //                 userModel.salt = crypto.genSalt();
    //                 return crypto.hashWithSaltAsync(userModel.password, userModel.salt)
    //             }
    //         })
    //         .then(function (hash) {
    //             userModel.password = hash;
    //             return authDAO.create(userModel);
    //         })
    //         .then(function (user) {
    //             res.send(user);
    //         })
    //         .catch(function (err) {
    //             next(err);
    //         })

}

function login(req, res, next) {
    var userModel = req.body;
    var userInDb = {};
    // var errors = validateUserModel(userModel);
    // if (errors.length > 0) {
    //     return next(errors);
    // }
    authDAO.findOne({
        username: userModel.username
    }, '')
        .then(function (user) {
            if (user) {
                userInDb = user;
                return crypto.hashWithSaltAsync(userModel.password, user.salt)
            } else {
                next({
                    status_code: 400,
                    message: "username or password wrong"
                })
            }

        })
        .then(function (hash) {
            if (hash == userInDb.password) {
                var userToEncode = {
                    username: userInDb.username
                }
                jwt.sign(userToEncode, function (err, token) {
                    if (err) {
                        next(err);
                    } else {
                        res.send({ token: token });
                    }
                });
                // checkAdm.checkAdm();
            } else {
                next("username or password wrong");
            }
        })
        .catch(function (err) {
            next("username or password wrong");
        })
}

function validateUserModel(userModel) {
    var errors = [];
    if (!userModel.username) {
        errors.push("username is required!");
    }
    // if (!userModel.password) {
    //     errors.push("password is required!");
    // }

    return errors;
}

function getuserbytoken(req, res) {
    var token = req.body.token;
    authDAO.findByUsername(token).then(user => {
        res.send(user);
    }).catch(err => {
        res.send(err);
    })
}
