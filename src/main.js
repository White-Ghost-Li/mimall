// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import router from './router'

// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

// 错误拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  if (res.status === 0) {
    return res.data
  } else if (response.status === 10) {
    window.location.href = '/#/login'
  } else {
    alert(res.msg)
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
  loading: require('./assets/imgs/loading-svg/loading-spinning-bubbles.svg')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
