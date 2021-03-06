// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message, Pagination, Button} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import store from './store'
import router from './router'

// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

// 错误拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    window.location.href = '/login'
    return Promise.reject(res)
  } else {
    this.$message.warning(res.message)
    return Promise.reject(res)
  }
}, (error) => { // 网络异常抛出(接口错误拦截)
  this.$message.error(error.response.data.message)
  return Promise.reject(error.response)
})
Vue.prototype.$message = Message
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(infiniteScroll)
Vue.use(VueLazyLoad, {
  loading: require('./assets/imgs/loading-svg/loading-spinning-bubbles.svg')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
