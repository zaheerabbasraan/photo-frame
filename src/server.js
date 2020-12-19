const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser= require('body-parser');
const cors = require('cors');
const helpers = require('./helpers');

const app = express();
const PORT = 3000;

app.use(cors());

let allowCrossDomain = function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Headers',"*");
    next();
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage, fileFilter: helpers.imageFilter , limits:{fileSize: 5*1024*1024 }});

app.post('/upload',allowCrossDomain, upload.single('photo'), (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    res.send(`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`);
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});