<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-success"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{orderTotal}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="require(`../assets/imgs/${item.productImage}`)" :alt="item.productName">{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType===1}" @click="submitPay(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType===2}" @click="submitPay(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <ScanPayCode v-if="showPay" @close="closePayModal" :img="payImg"></ScanPayCode>
    <modal
      title="支付确认"
      btn-type="3"
      :show-modal="showPayModal"
      sure-btn="查看订单"
      exit-btn="未支付"
      @closeModal="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import Modal from '../components/Modal'
import QRCode from 'qrcode'
import ScanPayCode from '../components/ScanPayCode'
export default {
  name: 'order-pay',
  components: {
    OrderHeader,
    Modal,
    ScanPayCode
  },
  data () {
    return {
      showPayModal: false,
      addressInfo: '', // 收货人地址
      orderId: this.$route.query.orderId,
      orderDetail: [], // 订单商品详情
      showDetail: false, // 是否显示订单详情
      orderTotal: '', // 支付金额
      payType: '', // 支付类型
      showPay: false, // 是否显示微信支付的弹框
      payImg: '', // 二维码图片内容
      T: '' // 定时器名称
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    goOrderList () {
      this.$router.push('/order/list')
    },
    getOrderList () {
      this.axios.get(`/user/orders/${this.orderId}`).then((res) => {
        const address = res.addressContent
        this.addressInfo = `${address.receiverName} ${address.receiverMobile} ${address.receiverProvince} ${address.receiverCity} ${address.receiverDistrict} ${address.receiverAddress}`
        this.orderDetail = res.productList
        this.orderTotal = res.orderTotal
      })
    },
    submitPay (p) {
      this.payType = p
      if (p === 1) { // 支付宝支付
        window.open(`/order/alipay?orderId=${this.orderId}`, '_blank') // 打开新的窗口
      } else if (p === 2) { // 微信支付
        this.axios.post('/user/pay', {
          orderId: this.orderId, // 订单号
          orderName: 'L', // 订单账号名称
          amount: 0.01, // 单位元
          payType: 2 // 1支付宝，2微信
        }).then((res) => {
          QRCode.toDataURL(res.content)
            .then(url => {
              this.payImg = url
              this.showPay = true
              this.loopOrderState()
            }).catch(() => {
              this.$message.error('微信二维码生成失败，请稍后重试')
            })
        })
      }
    },
    // 轮询当前订单支付状态
    // 订单状态:0-已取消-10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    loopOrderState () {
      this.T = setInterval(() => {
        this.axios.get(`/user/orders/${this.orderId}`).then((res) => {
          if (res.status === 20) {
            clearInterval(this.T)
          }
        })
      }, 1000)
    },
    closePayModal () {
      this.showPay = false
      this.showPayModal = true
      this.loopOrderState()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin';
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-success{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('../assets/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('../assets/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
            .icon-up{
              transform: rotate(180deg);
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
              &.theme-color{
                color: #FF6700;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('../assets/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('../assets/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>
