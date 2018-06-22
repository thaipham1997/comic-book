var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
    book_name: {
        type: String,
        required: true,
        unique: true
    },
    book_author: {
        type: String,
        required: true,
    },
    book_type: {
        type: String,
        required: true
    },
    book_begin: {
        type: String,
        required: true,
    },
    book_text: {
        type: String,
        required: true,
    },
    book_image: {
        type: String,
        required: true,
    },
    book_chap: [
        {
            chap_content: {
                type: String,
                require: false
            }
        }
    ]
});
// chong trung username
bookSchema.index({ book_name: 1 }, { unique: 1 });
var Book = mongoose.model('book', bookSchema);

module.exports = Book;