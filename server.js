var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('./config/db').dbConnect();
var authRouter = require('./routes/auth.routes');
var bookRouter = require('./routes/book.routes');
var errorHandler = require('./middle-ware/error-handle');

var jwt = require('./utils/jwt');

jwt.verify("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoYWlwaGFtMTk5NyIsImlhdCI6MTUyODcxNjM1OH0.Mg3SRmbviivuHqOfzo6i3ouU9LpaFAF70TlxtfZnodRWizt0gElXo8xKLwWdmNYINQyx2QjbRUWlzm2LsVGBTJ6yFEBXdmry7wyerZusnClaN_xwygQtV_Pb6QnVjxHvNlieyNT34QXe_ShEO7yzvZCePE_Q5F-2iA6IKPQ_npYPn8EoUTpDtikbroPf4nEvt6dGqaNdYoElnZpUrDB-qOOBrZg5UJlcC0ovRMoHn31CYOvxsAfZFzIZWAUYHA9c9JnkUQgLKTTXvH1srqD8QpzUmDGJ3YzHH6b4t45CuN8KoVolDLBIGxoMtC1ShBO1EAcikXdxNzsM6p7KP9HlNw",
function(err, decode){
    console.log(decode);
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/auth', authRouter());
app.use('/book', bookRouter());
app.use(errorHandler.errorHandler());

app.listen(process.env.PORT || 8081, function () {
    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://localhost:9999");
})