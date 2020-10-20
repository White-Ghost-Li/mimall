export default {
  cartTotalPrice (state) {
    let sum = 0
    state.cart.filter(item => item.selected).forEach(i => {
      sum += i.productTotalPrice
    })
    return Math.round(sum * 100) / 100
  },
  checkedNum (state) {
    return state.cart.filter(item => item.selected).length
  }
}
