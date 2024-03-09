const express = require("express");
const multer = require('multer');
const app = express();

const uploadDestination = "./upload";

const upload = multer({
    dest: uploadDestination,
    limits:{
        "fileSize": 1000000,
    },
    fileFilter: (req, file, cb) => {
        console.log(file);
        cb(null,true)
    }
});


app.post("/", upload.fields([{
    name:"avatar",
    maxCount:1
}, {
    name:"doc",
    maxCount: 1,
}]), (req, res) => {
    console.log(req.body.text);
  res.send('success');
});

app.listen(3000);
