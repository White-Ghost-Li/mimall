
import Vue from 'vue'
export default {
  saveUserName (state, userName) {
    state.userName = userName
  },
  getCartSum (state, sum) {
    const cart = state.cart
    if (!cart.sum) {
      Vue.set(cart, 'sum', sum)
    } else {
      state.cart.sum = sum
    }
  }
}
