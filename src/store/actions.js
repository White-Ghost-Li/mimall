
export default {
  saveUserName (context, userName) {
    context.commit('saveUserName', userName)
  },
  getCartSum (context, sum) {
    context.commit('getCartSum', sum)
  },
  saveCart (context, cart) {
    context.commit('saveCart', cart)
  }
}
