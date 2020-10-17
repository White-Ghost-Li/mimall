const express = require('express')
const db = require('./db.json')
const router = express.Router()

let reqData
router.use((req, res, next) => {
  reqData = {
    status: 0,
    message: ''
  }
  next()
})

router.get('/headerProduct', (req, res) => {
  console.log('进入headerProduct')
  reqData.data = db.headerProduct
  res.json(reqData)
})
router.post('/user/login', (req, res) => {
  console.log('进入login')
  const userName = req.body.userName || ''
  const password = req.body.password || ''
  if (userName === 'L' && password === '123') {
    reqData.data = db.login
    reqData.message = '登陆成功'
  } else {
    reqData.status = 1
    reqData.message = '用户名或密码错误'
  }
  res.json(reqData)
})
router.get('/user', (req, res) => {
  console.log('进入user')
  if (req.headers.cookie) {
    reqData.data = db.login
  } else {
    reqData.status = 10
    reqData.message = '用户未登录,无法获取当前用户信息'
  }
  res.json(reqData)
})
router.get('/carts/products/sum', (req, res) => {
  console.log('进入cart/sum')
  if (req.headers.cookie) {
    reqData.data = 2
  } else {
    reqData.status = 10
    reqData.message = '用户未登录,无法获取当前用户信息'
  }
  res.json(reqData)
})
router.get('/products/:id', (req, res) => {
  console.log('进入products/id')
  reqData.data = db.product
  res.json(reqData)
})

module.exports = router
