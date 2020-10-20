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
          productImg: String,
          selected: Boolean,
          quantity: Number,
          productTotalPrice: Number
        }
      ],
      dressContent: {
        dressId: String,
        dressName: String,
        streetName: String,
        postCode: String,
        tel: String,
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
      dressId: String,
      dressName: String,
      streetName: String,
      postCode: String,
      tel: String,
      idDefault: Boolean
    }
  ],
  selectedAll: Boolean
})
