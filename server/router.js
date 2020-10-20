
const express = require('express')
const router = express.Router()
const Admin = require('./models/Admin')
const Product = require('./models/Product')

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
      reqData.message = '登陆成功'
    } else {
      reqData.status = 1
      reqData.message = '用户名或密码错误'
    }
    res.json(reqData)
  })
}
function getProductList (str, res) {
  Product.find({listName: str}).then((product) => {
    if (product) {
      const classArr = []
      for (let i = 0; i < product.length; i++) {
        let is = false
        for (let j = 0; j < classArr.length; j++) {
          if (classArr[j].name === product[i].className) {
            is = true
          }
        }
        if (!is) {
          classArr.push({name: product[i].className, children: []})
        }
      }
      for (let i = 0; i < classArr.length; i++) {
        classArr[i].children = product.filter(item => item.className === classArr[i].name)
      }
      reqData.data = classArr
    } else {
      reqData.status = 2
      reqData.message = '网络异常，请重试'
    }
    res.json(reqData)
  })
}
// 获取header头部商品列表
router.get('/product/productHeader', (req, res) => {
  console.log('进入productHeader')
  getProductList('productHeader', res)
})
// 获取productMenu商品数据
router.get('/product/productMenu', (req, res) => {
  console.log('进入productMenu')
  getProductList('productMenu', res)
})
// 获取phoneList商品数据
router.get('/product/phoneList', (req, res) => {
  console.log('进入phoneList')
  getProductList('phoneList', res)
})
// 登陆账号
router.post('/user/login', (req, res) => {
  console.log('进入login')
  const userName = req.body.userName || ''
  const password = req.body.password || ''
  getUserInfo(userName, password, res)
})
// 获取用户信息
router.get('/user', (req, res) => {
  console.log('进入user')
  if (req.headers.cookie) {
    getUserInfo('L', '123', res)
  } else {
    reqData.status = 10
    reqData.message = '用户未登录,无法获取当前用户信息'
    res.json(reqData)
  }
})
// 注册
router.post('/user/register', (req, res) => {
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
// 获取某件商品详情
router.get('/products/:id', (req, res) => {
  console.log('进入products/id')
  const id = req.params.id
  Product.findOne({productId: id}).then((product) => {
    reqData.data = product
    res.json(reqData)
  })
})
// 加入购物车
router.post('/carts', (req, res) => {
  console.log('进入购物添加商品cart')
  let productId = req.body.productId
  let selected = req.body.selected
  if (productId && selected) {
    Product.findOne({productId}).then((product) => {
      if (product) {
        let cartList = {
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: product.productImage,
          productStock: product.productStock,
          quantity: 1,
          selected: selected,
          productTotalPrice: product.productPrice * 1
        }
        Admin.findOne({userName: 'L'}).then((admin) => {
          let selectedAll
          if (admin.cartList.length === 0) {
            selectedAll = true
          } else {
            selectedAll = admin.selectedAll
          }
          Admin.updateOne({userName: 'L'}, {
            $push: {cartList},
            $set: {selectedAll}
          }).then((doc) => {
            if (doc) {
              Admin.findOne({userName: 'L'}).then((userInfo) => {
                reqData.data = userInfo
                res.json(reqData)
              })
            }
          })
        })
      } else {
        reqData.status = 2
        reqData.message = '购物车添加失败'
        res.json(reqData)
      }
    })
  } else {
    reqData.status = 2
    reqData.message = '购物车添加失败'
    res.json(reqData)
  }
})
// 获取购物车信息
router.get('/carts', (req, res) => {
  console.log('进入购物车列表carts')
  Admin.findOne({
    userName: 'L',
    password: '123'
  }).then((admin) => {
    if (admin) {
      reqData.data = admin
    } else {
      reqData.status = 1
      reqData.message = '用户名或密码错误'
    }
    res.json(reqData)
  })
})

// router.put('/carts/unSelectAll', (req, res) => {
//   console.log('进入全不选')
//   reqData.data = db.cartsUnSelectAll
//   res.json(reqData)
// })
// router.put('/carts/selectAll', (req, res) => {
//   console.log('进入全选')
//   reqData.data = db.cartsSelectAll
//   res.json(reqData)
// })
// router.put('/carts/:productId', (req, res) => {
//   console.log('进入putcarts')
//   const quantity = req.body.quantity
//   const selected = req.body.selected
//
// })
// router.delete('/carts/:productId')

module.exports = router
