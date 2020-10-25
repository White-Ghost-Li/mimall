const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const admin = require('./routers/admin.js')
const main = require('./routers/main.js')
const product = require('./routers/product.js')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// 登陆拦截
app.use((req, res, next) => {
  console.log('登陆拦截')
  if (req.cookies && req.cookies.userInfo) {
    next()
  } else if (req.path === '/login' || req.path === '/logout' || req.path === '/register' || req.originalUrl.indexOf('/product') > -1) {
    next()
  } else {
    res.json({
      status: 10,
      message: '当前未登录'
    })
  }
})

app.use('/', main)
app.use('/user', admin)
app.use('/product', product)

mongoose.connect('mongodb://localhost:27019/mimall', (err) => {
  if (err) {
    console.log('数据库连接失败*********')
  } else {
    console.log('数据库连接成功')
    app.listen(4000)
  }
})
