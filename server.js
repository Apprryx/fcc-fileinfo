'use strict';
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var session = require('express-session');
var https = require('https');
var path = process.cwd();
var app = express();
require('dotenv').load();


app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.route('/')
    .get(function(req, res) {
        res.sendFile(path + '/public/index.html');
    });

app.post('/fileinfo', upload.single('upload'), function(req, res) {
    var obj = {}
    if (req.file) {
        obj = {
            filesize: req.file.size
        };
    } else {
        obj = {
            error: 'Please upload file, or report issue in github: https://github.com/Apprryx/fcc-fileinfo/issues'
        }
    }
    res.json(obj);
    });
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});
