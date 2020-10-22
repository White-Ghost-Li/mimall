
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
    // 检测该商品是否存在购物车中
    Admin.findOne({'userName': 'L', 'cartList.productId': productId})
      .then((userInfo) => {
        // 若存在则增加数量
        if (userInfo) {
          Admin.updateOne({
            'userName': 'L',
            'cartList.productId': productId
          }, {
            $inc: {
              'cartList.$.quantity': 1
            }
          }).then((doc) => {
            if (doc) {
              getUserInfo('L', '123', res)
            }
          })
        } else { // 若不存在，则重新添加
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
                    getUserInfo('L', '123', res)
                  }
                })
              })
            } else {
              reqData.status = 2
              reqData.message = '购物车添加失败'
              res.json(reqData)
            }
          })
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
// 全不选中
router.put('/carts/ifSelect', (req, res) => {
  console.log('进入全不选')
  let selected = req.body.selected
  Admin.findOne({userName: 'L'}).then((userInfo) => {
    let cart = userInfo.cartList.map(item => {
      item.selected = selected
      return item
    })
    Admin.updateOne({'userName': 'L'}, {
      $set: {
        'cartList': cart,
        'selectedAll': selected
      }
    }).then((doc) => {
      if (doc) {
        getUserInfo('L', '123', res)
      }
    })
  })
})
// 修改选中与否和商品数量
router.put('/carts/:productId', (req, res) => {
  console.log('进入putcarts')
  let productId = req.params.productId
  let quantity = req.body.quantity
  let selected = req.body.selected
  Admin.findOne({userName: 'L'}).then((userInfo) => {
    let cart = userInfo.cartList.map(item => {
      if (item.productId === productId) {
        item.quantity = quantity
        item.productTotalPrice = Math.round(quantity * item.productPrice * 100) / 100
        item.selected = selected
      }
      return item
    })
    let selectedAll = cart.every(item => item.selected)
    Admin.updateOne({
      'userName': 'L',
      'cartList.productId': productId
    }, {
      $set: {
        'cartList': cart,
        'selectedAll': selectedAll
      }
    }).then((doc) => {
      if (doc) {
        getUserInfo('L', '123', res)
      }
    })
  })
})
// 删除购物车中的一件商品
router.delete('/carts/:productId', (req, res) => {
  console.log('进入删除商品')
  let productId = req.params.productId
  Admin.findOne({userName: 'L'}).then((admin) => {
    if (admin) {
      let newCart = admin.cartList.filter(item => item.productId !== productId)
      let selectedAll = newCart.every(item => item.selected)
      Admin.updateOne({
        'userName': 'L'
      }, {
        $set: {
          'cartList': newCart,
          'selectedAll': selectedAll
        }
      }).then((doc) => {
        if (doc) {
          getUserInfo('L', '123', res)
        }
      })
    }
  })
})
// 退出
router.get('/logout', (req, res) => {
  console.log('退出')
  console.log('清理session会话信息')
  reqData.message = '已经退出'
  res.json(reqData)
})
// 获取地址列表
router.get('/shipping', (req, res) => {
  console.log('进入地址列表')
  Admin.findOne({userName: 'L'}).then((admin) => {
    if (admin) {
      reqData.data = admin.addressList
    } else {
      reqData.status = 1
      reqData.message = '服务器连接错误，请重试'
    }
    res.json(reqData)
  })
})
// 删除某个地址
router.delete('/shipping/:_id', (req, res) => {
  console.log('进入删除地址某项中')
  let _id = req.params._id
  Admin.findOne({userName: 'L'}).then((admin) => {
    if (admin) {
      Admin.updateOne({
        'userName': 'L',
        'addressList._id': _id
      }, {
        $pull: {
          'addressList': {
            _id
          }
        }
      }).then((doc) => {
        if (doc) {
          reqData.message = '删除成功'
          res.json(reqData)
        }
      })
    }
  })
})
// 修改地址
router.put('/shipping/:_id', (req, res) => {
  console.log('进入修改地址')
  let address = req.body.address
  let _id = req.params._id
  Admin.updateOne({
    'userName': 'L',
    'addressList._id': _id
  }, {
    $set: {
      'addressList.$.receiverName': address.receiverName,
      'addressList.$.receiverMobile': address.receiverMobile,
      'addressList.$.receiverProvince': address.receiverProvince,
      'addressList.$.receiverCity': address.receiverCity,
      'addressList.$.receiverDistrict': address.receiverDistrict,
      'addressList.$.receiverAddress': address.receiverAddress,
      'addressList.$.receiverZip': address.receiverZip,
      'addressList.$.isDefault': address.isDefault
    }
  }).then((doc) => {
    if (doc) {
      reqData.message = '地址修改成功'
      res.json(reqData)
    }
  })
})
// 新增地址
router.post('/shipping', (req, res) => {
  console.log('进入新增地址')
  let address = req.body.address
  Admin.findOne({userName: 'L'}).then((admin) => {
    if (admin) {
      let list = admin.addressList
      list.push(address)
      Admin.updateOne({userName: 'L'}, {
        $set: {'addressList': list}
      }).then((doc) => {
        if (doc) {
          reqData.message = '地址添加成功'
          res.json(reqData)
        }
      })
    }
  })
})
// 订单提交
router.post('/orders', (req, res) => {
  console.log('进入订单提交')
  let order = req.body.order
  Admin.updateOne({
    userName: 'L'
  }, {
    $addToSet: {
      'orders': order
    },
    $pull: {
      'cartList': {
        selected: true
      }
    }
  }).then((doc) => {
    if (doc) {
      Admin.findOne({
        userName: 'L'
      }).then((admin) => {
        reqData.data = admin.orders.find(item => item.createDate === order.createDate)
        res.json(reqData)
      })
    }
  })
})
//

module.exports = router
