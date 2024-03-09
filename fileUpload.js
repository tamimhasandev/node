const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const defaultUploadPath = "./upload/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, defaultUploadPath);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                                .replace(fileExt, "")
                                .toLowerCase()
                                .split(' ')
                                .join('-') + Date.now();
        cb(null, fileName + fileExt);
    }
});

const upload = multer({

    storage: storage,

    // Add limitation on file uploads
    limits: {
        fileSize: 10000000, // 1MB
    },
   // For filtering file 
    fileFilter: (req, file, cb) => {
        // All allowed mime type
        const imageMime = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        const pdfMime = ['application/pdf'];

        // files validation
        if(file.fieldname === 'avatar'){
           if(imageMime.includes(file.mimetype)){
            cb(null, true);
           } else {
            cb(new Error('image must be .jpeg, .png, .web'));
           }
        } else if(file.fieldname === 'doc') {
            if(pdfMime.includes(file.mimetype)){
                cb(null, true);
            } else {
                cb(new Error('document must be type of pdf'))
            }
        } else {
            cb(new Error('there was an unknown error'));
        }
    }
});



app.post('/upload', [upload.fields([
    {name: "avatar",maxCount: 1},
    {name: "doc", maxCount: 1}
]), (req, res) => {
    res.send('File uploaded successfully');
}]);

app.listen(3000, () => console.log('Server started at 3000'));

app.use((err, req, res, next) => {
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    } else {
        next(err);
    }
    
});