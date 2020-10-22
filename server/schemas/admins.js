const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  userName: String,
  userId: String,
  password: {
    type: String,
    default: '0000'
  },
  email: String,
  cartList: [
    {
      productId: String,
      productName: String,
      productPrice: Number,
      productImage: String,
      quantity: Number,
      selected: Boolean,
      productTotalPrice: Number
    }
  ],
  orders: [
    {
      createDate: String,
      productList: [
        {
          productId: String,
          productName: String,
          productPrice: Number,
          productImage: String,
          selected: Boolean,
          quantity: Number,
          productTotalPrice: Number
        }
      ],
      addressContent: {
        receiverId: String,
        receiverName: String,
        receiverMobile: String,
        receiverProvince: String,
        receiverCity: String,
        receiverDistrict: String,
        receiverAddress: String,
        receiverZip: String,
        idDefault: Boolean
      },
      countTotal: Number, // 总数量
      subTotal: Number, // 商品总价
      orderTotal: Number, // 应付金额
      shipping: Number, // 运费
      discount: Number, // 折扣
      tax: Number // 税
    }
  ],
  addressList: [
    {
      receiverName: String, // 名字
      receiverMobile: String, // 手机号
      receiverProvince: String, // 省份
      receiverCity: String, // 市
      receiverDistrict: String, // 区
      receiverAddress: String, // 村/街道/小区
      receiverZip: String, // 邮编
      isDefault: Boolean // 是否默认/选中
    }
  ],
  selectedAll: Boolean
})
