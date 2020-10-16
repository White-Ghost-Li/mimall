<template>
  <div class="header">
    <div class="nav-top-bar">
      <div class="container">
        <div class="top-bar-menu">
          <a href="JavaScript:">小米商城</a> |
          <a href="JavaScript:">MIUI</a> |
          <a href="JavaScript:">IoT</a> |
          <a href="JavaScript:">云服务</a> |
          <a href="JavaScript:">金融</a> |
          <a href="JavaScript:">有品</a> |
          <a href="JavaScript:">小爱开放平台</a> |
          <a href="JavaScript:">企业团购</a> |
          <a href="JavaScript:">资质证照</a> |
          <a href="JavaScript:">协议规则</a> |
          <a href="JavaScript:">下载app</a> |
          <a href="JavaScript:">智能生活</a> |
          <a href="JavaScript:">Select Location</a>
        </div>
        <div class="top-bar-user">
          <a href="JavaScript:" v-if="userName">{{userName}} |</a>
          <a href="JavaScript:" v-if="!userName" @click="login">登陆 |</a>
          <a href="JavaScript:" v-show="!userName">注册 |</a>
          <a href="JavaScript:">消息通知 |</a>
          <a href="JavaScript:" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cart.sum}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu" v-for="(product, i) in headerProduct" :key="i" v-if="headerProduct">
            <span>{{product.name}}</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item, j) in product.children" :key="j">
                  <a :href="'/product/'+item.id" target="_blank">
                    <div class="pro-img">
<!--                      <img :src="item.img" :alt="item.productId">-->
                      <img src="require('../assets/imgs/nav-img/'+item.img)" :alt="item.id">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'NavHeader',
  data () {
    return {
      // userName: this.$store.state.userName,
      headerProduct: []
    }
  },
  computed: {
    ...mapState(['userName', 'cart'])
  },
  filters: {
    currency (val) {
      if (!val) return '0.00'
      return '￥' + val + '元'
    }
  },
  mounted () {
    // this.getProductList()
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    // getProductList () {
    //   this.axios.get('/headerProduct').then((res) => {
    //     this.headerProduct = res
    //   })
    // },
    goToCart () {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin";
.header{
  .nav-top-bar{
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #B0B0B0;
    .container{
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a{
        display: inline-block;
        color: #B0B0B0;
        margin-right: 17px;
      }
      .my-cart{
        width: 110px;
        background-color: #FF6600;
        color: white;
        text-align: center;
        margin-right: 0;
        .icon-cart{
          @include bgimg(18px, 14px, "../assets/imgs/icon-cart.png");
          margin-right: 4px;
          margin-bottom: -4px;
        }
      }
    }
  }
  .nav-header{
    .container{
      position: relative;
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      display: flex;
      height: 112px;
      justify-content: space-between;
      align-items: center;
      .header-logo{
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
      .header-menu{
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu{
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span{
            cursor: pointer;
          }
          &:hover{
            color: #FF6600;
            .children{
              height: 220px;
              opacity: 1;
            }
          }
          .children{
            background-color: #ffffff;
            position: absolute;
            z-index: 10;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;                 //透明度
            overflow: hidden;           //默认隐藏掉
            border-top: 1px solid #E5E5E5;
            box-shadow: 0 7px 6px 0 rgba(0,0,0,0.11);
            transition: all .5s;       //动画
            .product{
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              position: relative;
              a{
                display: inline-block;
              }
              img{
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img{
                height: 137px;
              }
              .pro-name{
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: #333333;
              }
              .pro-price{
                color: #FF6600;
              }
              &:before{               //分隔符
                content: ' ';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid #D7D7D7;
                height: 100px;
                width: 1px;
              }
              &:last-child:before{          //分隔符最后一个去掉
                display: none;
              }
            }
          }
        }
      }
      .header-search{
        width: 319px;
        .wrapper{
          height: 50px;
          border: 1px solid #E0E0E0;
          display: flex;
          align-items: center;
          input {
            border: none;
            border-right: 1px solid #E0E0E0;
            box-sizing: border-box;
            width: 264px;
            height: 50px;
            padding-left: 10px;
          }
          a{
            @include bgimg(18px, 18px, "../assets/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
