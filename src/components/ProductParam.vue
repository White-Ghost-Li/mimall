<template>
  <div class="product-param" :class="{'is_fixed': isFixed}">
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
  props: {productName: String},
  data () {
    return {
      isFixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = (scrollTop > 152)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.initHeight, false)
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin';
  .product-param{
    height: 70px;
    line-height: 70px;
    border: 1px solid #E5E5E5;
    background-color: #ffffff;
    &.is_fixed{
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 5px 5px #cccccc;
    }
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
