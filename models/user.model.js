var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['reader', 'adm'],
        default: 'reader'
    },
    image: {
        type: String,
        required: false
    },
    salt: {
        type: String,
        required: true
    }
});
// chong trung username
userSchema.index({username: 1}, {unique: 1});
var User = mongoose.model('user', userSchema);

module.exports = User;