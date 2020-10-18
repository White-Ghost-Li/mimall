<template>
  <div class="logo">
    <a href="/"></a>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.logo{
  display: inline-block;
  width: 55px;
  height: 55px;
  background-color: #FF6600;
  a{
    display: inline-block;
    width: 110px;
    height: 55px;
    &:before{
      content: ' ';
      @include bgimg(55px, 55px, "../assets/imgs/mi-logo.png");
        transition: margin .3s;
    }
    &:after{
      content: ' ';
      @include bgimg(55px, 55px, "../assets/imgs/mi-home.png");
    }
    &:hover:before{
      margin-left: -55px;
      transition: margin .3s;
    }
  }
}
</style>
