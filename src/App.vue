<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'
export default {
  name: 'App',
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.axios.get('/user').then((res) => {
        let userName, cart
        if (!res) {
          userName = ''
          cart = []
        } else {
          userName = res.userName
          cart = res.cartList
        }
        this.$store.dispatch('saveUserName', userName)
        this.$store.dispatch('saveCart', cart)
        // this.saveUserName(userName)
        // this.saveCart(cart)
      })
    }
  }
  // ...mapActions(['saveUserName', 'saveCart'])
}
</script>

<style>
@import './assets/scss/reset.scss';
</style>
