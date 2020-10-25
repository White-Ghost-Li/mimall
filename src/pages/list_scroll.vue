<template>
  <div class="list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <Loading v-if="loading"></Loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createDate}}
                <span>|</span>
                {{order.addressContent.receiverName}}
                <span>|</span>
                订单号：{{order._id}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.orderTotal}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.productList" :key="i">
                  <div class="good-img">
                    <img v-lazy="require(`../assets/imgs/${item.productImage}`)" :alt="item.productName">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.quantity+'X'+item.productPrice}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr">
                <p :class="order.status===10 ? 'go':'hui'" @click="goPay(order)">{{order.statusDesc}}</p>
              </div>
            </div>
          </div>
          <div class="loadingMore"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="1">
            <img src="../assets/imgs/loading-svg/loading-bars.svg" alt="loading" v-show="busy&&pageNum<orders.length">
          </div>
          <no-data v-if="!loading&&list.length===0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import OrderHeader from '../components/OrderHeader'
export default {
  name: 'list',
  data () {
    return {
      list: [], // 订单列表
      loading: true,
      pageNum: 1, // 当前页
      orders: [],
      pageSize: 10,
      busy: true // scroll是否禁用
    }
  },
  components: {
    Loading,
    OrderHeader,
    NoData
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.axios.get('/user/orders').then((res) => {
        this.loading = false
        for (let i = 0; i < res.length; i += this.pageSize) {
          this.orders.push(res.slice(i, i + this.pageSize))
        }
        this.list = this.orders[0]
        this.busy = false
      })
    },
    goPay (order) {
      if (order.status === 10) {
        this.$router.push({
          path: '/order/pay',
          query: {
            orderId: order._id
          }
        })
      }
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.pageNum += 1
        this.list = this.list.concat(this.orders[this.pageNum - 1])
        if (this.pageNum < this.orders.length) {
          this.busy = false
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.list{
  .wrapper{
    background-color: #F5F5F5;
    padding-top:33px;
    padding-bottom:110px;
    .order-box{
      .order{
        border: 1px solid #d7d7d7;
        background-color:#ffffff;
        margin-bottom:31px;
        &:last-child{
          margin-bottom:0;
        }
        .order-title{
          height: 74px;
          line-height: 74px;
          background-color:#FFFAF7;
          padding:0 43px;
          font-size:16px;
          color:#666666;
          .item-info{
            span{
              margin:0 9px;
            }
          }
          .money{
            font-size:26px;
            color:#333333;
          }
        }
        .order-content{
          padding:0 43px;
          .good-box{
            width:88%;
            .good-list{
              display: flex;
              align-items: center;
              height:145px;
              .good-img{
                width:112px;
                img{
                  width:100%;
                }
              }
              .good-name{
                font-size:20px;
                color:#333333;
              }
            }
          }
          .good-state{
            height: 145px;
            line-height: 145px;
            font-size: 20px;
            .hui{
              color:#999999;
            }
            .go{
              color:#FF6600;
              cursor: pointer;
            }
          }
        }
      }
      .pagination{
        text-align:right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #FF6600;
      }
      .loadingMore{
        text-align: center;
      }
    }
  }
}
</style>
