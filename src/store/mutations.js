
// import Vue from 'vue'
export default {
  saveUserName (state, userName) {
    state.userName = userName
  },
  saveCart (state, {cart}) {
    state.cart = cart
  }
}
