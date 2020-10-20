export default {
  cartTotalPrice (state) {
    let sum = 0
    state.cart.filter(item => item.selected).map(i => {
      sum += i.productTotalPrice
    })
    return sum
  },
  checkedNum (state) {
    return state.cart.filter(item => item.selected).length
  }
}
