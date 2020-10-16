<template>
  <div class="product-param">
    <div class="container">
      <div class="pro-title">
        <span>{{productName}}</span>
      </div>
      <div class="pro-param">
        <a href="">概述</a><span>|</span>
        <a href="">参数</a><span>|</span>
        <a href="">用户评价</a>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductParam',
  props: ['productName']
}
</script>

<style lang="scss">
@import '../assets/scss/mixin';
  .product-param{
    height: 70px;
    line-height: 70px;
    border: 1px solid #E5E5E5;
    .container{
      @include flex();
      .pro-title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
      }
      .pro-param{
        font-size: 14px;
        span{
          margin: 0 10px;
        }
        a{
          color: #666666;
        }
      }
    }
  }
</style>
