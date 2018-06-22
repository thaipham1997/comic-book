var User = require('../models/user.model');
var crypto = require('../utils/crypto');
var jwt = require('./../utils/jwt');
var multer = require('multer');

module.exports = {
    create: create,
    findById: findById,
    findOne: findOne,
    findAll: findAll,
    updateByCondition: updateByCondition,
    deleteById: deleteById,
    findByUsername: findByUsername,
    createUser: createUser,
    getAllUser: getAllUser,
    findUserByID: findUserByID,
    uploadImage: uploadImage
}

function createUser(request) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: request.username }, (err, userModel) => {
            if (err) {
                reject('ERROR');
            } else if (userModel) {
                reject('USER_IS_EXIST');
            } else {
                var salt = crypto.genSalt();
                var USER = {
                    name: request.name,
                    username: request.username,
                    password: crypto.hashWithSalt(request.password, salt),
                    image: request.image, 
                    salt: salt
                }
                User.create(USER, (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                });
            }
        });
    })
}

// function findBook(request) {
//     return new Promise
// }

function findUserByID(id) {
    return new Promise((resolve , reject) =>{
        User.findOne({'_id': id} , (err , user) =>{
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        })
    })
}

function uploadImage(request) {
    return new Promise((resolve , reject) =>{
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/image')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + '.jpg')
            }
        });
    
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
        resolve(upload);
    })
  
}

function getAllUser() {
    return new Promise( (resolve , reject) =>{
        User.find({} , (err , users) =>{
            if(err){
                reject(err);
            }else{
                resolve(users);
            }
        })
    })
}

function create(model) {
    var user = new User(model);
    return user.save();
}

function findById(id) {
    {
        return User.findById(id);
    }
}

function findByUsername(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, (err, user) => {            
            User.findOne({ username: user.username }, (err, userModel) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(convertModel(userModel));
                }
            });
        });
    });
}

function convertModel(userModel) {
    var obj = userModel.toObject();
    delete obj.password;
    delete obj.salt;
    return obj;
}

function findAll(condition, _skip, _limit, _projection, _sortBy, isDes) {
    var projection = _projection ? _projection : "";
    var skip = _skip ? (_skip > 0 ? _skip : 0) : 0;
    var limit = _limit ? (_limit > 0 ? _limit : 0) : 0;
    var sort = isDes ? "-" + _sortBy : _sortBy;
    var where = condition ? condition : {};
    var result = [];
    User.find(where)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(_projection)
        .exec(function (err, _result) {
            result = _result
            return User.count(condition);
        }).then(function (_total) {
            return new Promise(function (resolve, reject) {
                if (err) {
                    reject(err);
                } else {

                    resolve({
                        result: result,
                        total: _total
                    });
                }
            })
        })
}

function findOne(condition, projection) {
    return User.findOne(condition, projection); // projection : 'name ...'
}

function updateById(id, userModel) {
    return User.findByIdAndUpdate(id, userModel);
}

function updateByCondition(condition, userModel) {
    return User.findOneAndUpdate(condition, userModel);
}

function deleteById(id) {
    return User.findByIdAndRemove(id);
}

function count(condition) {
    if (condition) {
        return count(condition);
    }
    return User.count({});
}