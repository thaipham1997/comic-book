var Book = require('../models/book.model');
var Chap = require('../models/chap.model');

module.exports = {
    addNewBook: addNewBook,
    getAllBook: getAllBook,
    findBookByID: findBookByID,
    deleteBook: deleteBook,
    insertChap: insertChap
    // addChap: addChap
}

// function addChap(request) {
//     return new Promise((resolve , reject) =>{
//         var CHAP = {
//             chap_pages : request.chap_pages
//         }

//         Chap.create(CHAP , (err , chap) =>{
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(chap);
//             }
//         })
//     })
// }

function insertChap(request) {
    return new Promise((resolve , reject) =>{
        const id = request.id;
        var chap = {
            chap_content: request.book_chap
        }
        Book.findOne({"_id" : id} , (err , book) =>{
            if(err){
                console.log(err);
            }else{
                book.update({book_chap: book.book_chap}, {$push: {"book_chap.chap_content" : chap}}, (err) =>{
                    if(err){
                        reject(err);
                    }else{
                        console.log("thanh cong");
                    }
                });
            }
        })
    })
}

function deleteBook(id) {
    return new Promise((resolve, reject) => {
        Book.remove({ '_id': id }, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('thanh cong');
            }
        })
    })
}

function addNewBook(request) {
    return new Promise((resolve, reject) => {
        var BOOK = {
            book_name: request.book_name,
            book_author: request.book_author,
            book_type: request.book_type,
            book_begin: request.book_begin,
            book_text: request.book_text,
            book_image: request.book_image,
        }

        Book.create(BOOK, (err, book) => {
            if (err) {
                reject(err);
            } else {
                resolve(book);
            }
        });
    });
}

function getAllBook() {
    return new Promise((resolve, reject) => {
        Book.find({}, (err, book) => {
            if (err) {
                reject(err);
            } else {
                resolve(book);
            }
        });
    });
}

function findBookByID(id) {
    return new Promise((resolve, reject) => {
        Book.findOne({ '_id': id }, (err, book) => {
            if (err) {
                reject(err);
            } else {
                resolve(book);
            }
        });
    })
}