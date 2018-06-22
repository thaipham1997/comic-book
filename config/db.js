var mongoose = require('mongoose');
module.exports = {
    dbConnect: dbConnect
}
function dbConnect() {
    mongoose.connect('mongodb://phamhongthai:hongthai11@ds117101.mlab.com:17101/comic-book');
}