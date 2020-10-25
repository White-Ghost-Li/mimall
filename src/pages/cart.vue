<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：商品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked':allChecked}" @click="checkedAll"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in cart" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.selected}" @click="updateCartSomeOne(item)"></span>
              </div>
              <div class="item-name">
                <img :src="require(`../assets/imgs/${item.productImage}`)" :alt="item.productName">
                <span>{{item.productName}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <button @click="updateCartSomeOne(item,'-')">-</button>
                  <span>{{item.quantity}}</span>
                  <button @click="updateCartSomeOne(item,'+')">+</button>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{cart.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <button class="btn" @click="goOrder">去结算</button>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar'
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'cart',
  data () {
    return {
      allChecked: false // 是否选中
    }
  },
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotalPrice', 'checkedNum'])
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    getCartList () {
      this.axios.get('/user/carts').then((res) => {
        this.renderData(res)
      })
    },
    checkedAll () {
      this.axios.put('/user/carts/ifSelect', {
        selected: !this.allChecked
      }).then((res) => {
        this.renderData(res)
      })
    },
    renderData (res) {
      this.allChecked = res.selectedAll
      this.$store.dispatch('saveCart', res.cartList)
    },
    updateCartSomeOne (item, type) {
      let quantity = item.quantity
      let selected = item.selected
      if (type === '-') {
        if (quantity === 1) {
          this.$message.warning('客官，真的不能再少了，再少就没了')
          return
        }
        --quantity
      } else if (type === '+') {
        // if (quantity > item.productStock) {
        //   alert('客官，已经超额了，我们没有辣么多')
        //   return
        // }
        ++quantity
      } else {
        selected = !item.selected
      }
      this.axios.put(`/user/carts/${item.productId}`, {
        quantity,
        selected
      }).then((res) => {
        this.renderData(res)
      })
    },
    delProduct (item) {
      this.axios.delete(`/user/carts/${item.productId}`).then((res) => {
        this.$message.success('删除成功')
        this.renderData(res)
      })
    },
    goOrder () {
      if (this.checkedNum === 0) {
        this.$message.warning('客官这是玩笑了，您不选怎么结算呢！')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin';
.cart{
  .wrapper{
    background-color:#ffffff;
    padding-top:30px;
    padding-bottom:114px;
    .cart-box{
      background-color:#ffffff;
      font-size:14px;
      color:#999999;
      text-align:center;
      .checkbox{
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #E5E5E5;
        vertical-align: middle;
        margin-right: 17px;
        cursor:pointer;
        &.checked{
          background:url('../assets/imgs/icon-gou.png') #FF6600 no-repeat center;
          background-size:16px 12px;
          border:none;
        }
      }
      .cart-item-head{
        display:flex;
        height: 79px;
        line-height: 79px;
        .col-1{
          flex:1;
        }
        .col-2{
          flex:2;
        }
        .col-3{
          flex:3;
        }
      }
      .cart-item-list{
        .cart-item{
          display:flex;
          align-items:center;
          height:125px;
          border-top:1px solid #E5E5E5;
          font-size:16px;
          .item-check{
            flex:1;
          }
          .item-name{
            flex:3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img{
              width:80px;
              height:80px;
              vertical-align:middle;
            }
            span{
              margin-left: 30px;
            }
          }
          .item-price{
            flex:1;
            color:#333333;
          }
          .item-num{
            flex:2;
            .num-box{
              display:inline-block;
              width:150px;
              height:40px;
              line-height:40px;
              border:1px solid #E5E5E5;
              font-size:14px;
              a{
                display:inline-block;
                width:50px;
                color:#333333;
              }
              span{
                display:inline-block;
                width:50px;
                color:#333333;
              }
            }
          }
          .item-total{
            flex:1;
            color:#FF6600;
          }
          .item-del{
            flex:1;
            width:14px;
            height:12px;
            background:url('../assets/imgs/icon-close.png') no-repeat center;
            background-size:contain;
            cursor:pointer;
          }
        }
      }
    }
    .order-wrap{
      font-size:14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip{
        margin-left: 29px;
        a{
          color: #666666;
          margin-right:37px;
        }
        span{
          color:#FF6600;
          margin:0 5px;
        }
      }
      .total{
        font-size:14px;
        color:#FF6600;
        span{
          font-size:24px;
        }
        .btn{
          @include button(202px,50px);
          line-height:50px;
          font-size:18px;
          margin-left:37px;
        }
      }
    }
  }
}
</style>
