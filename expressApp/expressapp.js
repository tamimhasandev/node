/**
 * Title: express function methods and details
 * Description: express methods and details
 * Author: Md Tamim Hasan
 * Date: 07-03-2024
 */

// Dependencies
const express = require('express');

const app = express();

app.use(express.json()) // express.json() is the middleware that verifies that the request body is valid json

app.use(express.raw()) // express.raw() is a middleware that gives us buffer data

app.use(express.text()) // express.text() is a middleware that gives us raw text 

app.use(express.urlencoded()); // express.text() is a middleware that gives us url encoded data