
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  userName: '',
  cartNum: 0,
  cart: {}
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
