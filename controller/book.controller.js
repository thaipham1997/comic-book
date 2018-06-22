var fs = require('fs');
var path = require('path');
var bookDAO = require('../dao/book.dao');

module.exports = {
    addBook: addBook,
    getBook: getBook,
    findBookId: findBookId,
    deleteBookById: deleteBookById,
    insertChapBook: insertChapBook
    // addChap: addChap
}

// function addChap(req, res, next) {
//     var chapModel = req.body;

//     var request = {
//         chap_pages: chapModel.chap_pages
//     }

//     bookDAO.addChap(request).then(chap => {
//         console.log(chap);
//     }).catch(err => {
//         console.log(err);
//     })
// }

function addBook(req, res, next) {
    var bookModel = req.body;
    var request = {
        book_name: req.body.book_name,
        book_author: req.body.book_author,
        book_type: req.body.book_type,
        book_begin: req.body.book_begin,
        book_text: req.body.book_text,
        book_image: req.body.book_image,
        book_chap: req.body.book_chap
    }
    bookDAO.addNewBook(request).then(book => {
        res.send(book);
    }).catch(err => {
        res.send(err);
    })
}

function insertChapBook(req , res , next) {
    var id = req.body.id;
    var content = req.body.book_chap;
    var request = {
        id: id,
        content: content
    }

    bookDAO.insertChap(request).then(note =>{
        console.log("thanh cong");
    }).catch(err =>{
        console.log(err);
    });
}

function getBook(req, res, next) {
    bookDAO.getAllBook().then(book => {
        res.send(book);
    }).catch(err => {
        console.log('tach');
    })
}

function findBookId(req, res, next) {
    var id = req.body._id;

    bookDAO.findBookByID(id).then(book => {
        res.send(book);
    }).catch(err => {
        console.log(err);
    })
}

function deleteBookById(req, res, next) {
    var id = req.body._id;
    console.log(id)

   bookDAO.deleteBook(id);
}