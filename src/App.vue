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
      this.axios.get('/user').then(() => {

      })
    },
    getCartSum () {
      this.axios.get('/carts/products/sum').then(() => {

      })
    }
  }
}
</script>

<style>
@import './assets/scss/reset.scss';
</style>
