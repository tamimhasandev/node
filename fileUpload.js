const express = require('express');
const multer = require('multer');

const app = express();

const defaultUploadPath = "./upload/";

const upload = multer({
    dest: defaultUploadPath,
    limits: {
        fileSize: 1000000, // 1MB
    },
});

app.post('/upload', [upload.single('avatar'), (req, res) => {
    res.send('File uploaded successfully');
}]);

app.listen(3000, () => console.log('Server started at 3000'));

app.use((err, req, res, next) => {
    if(err){
        res.status(500).send(err);
    }{
        next(err);
    }
});