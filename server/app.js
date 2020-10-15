var express = require('express')
var bodyParser = require('body-parser')
var admin = require('./router.js')
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', admin)

app.listen(4000)
