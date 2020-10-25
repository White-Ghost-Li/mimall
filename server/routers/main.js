const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')

let reqData
router.use((req, res, next) => {
  reqData = {
    status: 0,
    message: ''
  }
  next()
})
function getUserInfo (userName, password, res) {
  Admin.findOne({userName, password}).then((admin) => {
    if (admin) {
      reqData.data = admin
    } else {
      reqData.status = 1
      reqData.message = '用户名或密码错误'
    }
    res.json(reqData)
  })
}
// 登陆
router.post('/login', (req, res) => {
  console.log('进入login')
  const userName = req.body.userName || ''
  const password = req.body.password || ''
  getUserInfo(userName, password, res)
})
// 注册
router.post('/register', (req, res) => {
  console.log('进入注册')
  const userName = req.body.userName
  const password = req.body.password
  const email = req.body.email
  if (userName && password && email) {
    new Admin({
      userName,
      password,
      email,
      selectedAll: false
    }).save((err) => {
      if (err) {
        reqData.status = 404
        reqData.message = '网络异常，请重试'
      } else {
        reqData.data = {
          userName,
          password,
          email
        }
      }
      res.json(reqData)
    })
  } else {
    reqData.status = 2
    reqData.message = '用户信息内容不完整'
    res.json(reqData)
  }
})
// 退出
router.get('/logout', (req, res) => {
  console.log('退出')
  console.log('清理session会话信息')
  reqData.message = '已经退出'
  res.json(reqData)
})

module.exports = router
