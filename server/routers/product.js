const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

let reqData
router.use((req, res, next) => {
  reqData = {
    status: 0,
    message: ''
  }
  next()
})

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
router.get('/productHeader', (req, res) => {
  console.log('进入productHeader')
  getProductList('productHeader', res)
})
// 获取productMenu商品数据
router.get('/productMenu', (req, res) => {
  console.log('进入productMenu')
  getProductList('productMenu', res)
})
// 获取phoneList商品数据
router.get('/phoneList', (req, res) => {
  console.log('进入phoneList')
  getProductList('phoneList', res)
})
// 获取某件商品详情
router.get('/:id', (req, res) => {
  console.log('进入products/id')
  const id = req.params.id
  Product.findOne({productId: id}).then((product) => {
    reqData.data = product
    res.json(reqData)
  })
})

module.exports = router
