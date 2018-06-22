var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chapSchema = new Schema({
   chap_pages: [
       {
           require: false,
           type: String
       }
   ]
});
// chong trung username
var Chap = mongoose.model('chap', chapSchema);

module.exports = Chap;