const express = require('express');
const app = express();
const rout = require('./src/routes/file.route');
const cors = require('cors')

global.__basedir = __dirname;
global._fileName_ = ""
app.use(express.json())
console.log("app.js")
app.use(cors())
app.use('/', rout)

app.listen(5000, function () {
    console.log('I listening in port 5000');
})
