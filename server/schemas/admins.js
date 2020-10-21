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
      orderId: String,
      createDate: String,
      orderList: [
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
      dressContent: {
        receiverId: String,
        receiverName: String,
        receiverPhone: String,
        receiverMobile: String,
        receiverProvince: String,
        receiverCity: String,
        receiverDistrict: String,
        receiverAddress: String,
        receiverZip: String,
        idDefault: Boolean
      },
      subTotal: Number,
      orderTotal: Number,
      shipping: Number,
      discount: Number,
      tax: Number
    }
  ],
  addressList: [
    {
      receiverId: String, // ID
      receiverName: String, // 名字
      receiverPhone: String, // 手机区号
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
