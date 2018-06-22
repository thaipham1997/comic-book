var mongoose = require('mongoose');
module.exports = {
    dbConnect: dbConnect
}
function dbConnect() {
    mongoose.connect('mongodb://localhost:27017/comic-book');
}