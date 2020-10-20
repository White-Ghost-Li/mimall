const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  productName: String, // 商品名字
  productId: String, // 商品Id
  productSubtitle: String, // 商品代言（广告）
  productImage: String, // 商品图片
  productPrice: Number, // 商品价格
  productOldPrice: Number, // 商品原价
  productStatus: Number, // 商品静态码
  productStock: Number, // 商品数量上限
  createTime: String, // 商品上架时间
  updateTime: String, // 商品根更新时间
  listName: String, // 模块名称(productHeader,productMenu,phoneList)
  listId: String, // 模块id
  className: String // 类型名称
})
