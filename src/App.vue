<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.getUserInfo()
    this.getCartSum()
  },
  methods: {
    getUserInfo () {
      this.axios.get('/user').then((res) => {
        let userName
        if (!res) {
          userName = ''
        } else {
          userName = res.userName
        }
        this.$store.dispatch('saveUserName', userName)
      })
    },
    getCartSum () {
      this.axios.get('/carts/products/sum').then((res) => {
        this.$store.dispatch('getCartSum', res || 0)
      })
    }
  }
}
</script>

<style>
@import './assets/scss/reset.scss';
</style>
