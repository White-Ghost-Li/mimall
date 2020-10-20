const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const admin = require('./router.js')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', admin)

mongoose.connect('mongodb://localhost:27019/mimall', (err) => {
  if (err) {
    console.log('数据库连接失败*********')
  } else {
    console.log('数据库连接成功')
    app.listen(4000)
  }
})
