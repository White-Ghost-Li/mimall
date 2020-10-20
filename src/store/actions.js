
export default {
  saveUserName (context, userName) {
    context.commit('saveUserName', userName)
  },
  saveCart (context, cart) {
    context.commit('saveCart', {cart})
  }
}
