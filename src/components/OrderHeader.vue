<template>
  <div class="order-header">
    <div class="container clearfix">
      <logo></logo>
      <div class="title">
        <h2>{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
        <a href="/person">{{userName}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
import {mapState} from 'vuex'
export default {
  name: 'OrderHeader',
  props: {
    title: String
  },
  computed: {
    ...mapState(['userName'])
  },
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.clearfix:before,.clearfix:after{
  content: '';
  display: table;
}
.clearfix:after{
  clear: both;
}
.order-header{
  border-bottom: 2px solid #FF6600;
  padding: 30px 0;
  .logo{
    float: left;
  }
  .title,.username{
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title{
    float: left;
    color: #333333;
    font-weight: bold;
    margin-left: 54px;
    h2{
      font-size: 28px;
      span{
        font-size: 14px;
        margin-left: 17px;
        color: #999999;
        font-weight: 200;
      }
    }
  }
  .username{
    float: right;
    a{
      color: #666666;
      font-size: 16px;
    }
  }
}
</style>
