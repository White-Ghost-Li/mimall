<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="../assets/imgs/logo-footer.png" alt="logo">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">简体</a><span>|</span>
      <a href="javascript:;">繁体</a><span>|</span>
      <a href="javascript:;">English</a><span>|</span>
      <a href="javascript:;">常见问题</a><span>|</span>
      <a href="javascript:;">隐私政策</a><span>|</span>
    </div>
    <p class="copyMi">小米公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号</p>
  </div>
</template>

<script>
export default {
  name: 'NavFooter'
}
</script>

<style scoped lang="scss">
  .footer{
    height: 234px;
    border-top: 4px solid #FF6600;
    background-color: #333333;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: #999999;
      }
      span{
        margin: 0 7px;
      }
      margin-bottom: 5px;
    }
  }
</style>
