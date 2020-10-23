<template>
  <div class="alipay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <Loading v-if="loading"></Loading>
    <div class="from" v-html="content"></div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import OrderHeader from '../components/OrderHeader'
export default {
  name: 'alipay',
  data () {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  components: {
    Loading,
    OrderHeader
  },
  mounted () {
    this.paySubmit()
  },
  methods: {
    paySubmit () {
      this.axios.post('/pay', {
        orderId: this.orderId, // 订单号
        orderName: 'L', // 订单账号名称
        amount: 0.01, // 单位元
        payType: 1 // 1支付宝，2微信
      }).then((res) => {
        this.content = res.content
        setTimeout(() => {
          document.forms[0].submit()
        }, 200)
      })
    }
  }
}
</script>

<style>

</style>
