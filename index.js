const express = require('express');
const app = express();

app.use(express.raw());

app.get('/', (req, res) => {
    console.log(req.body);
});

app.listen(3000);