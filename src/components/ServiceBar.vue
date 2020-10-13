<template>
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满99元包邮</li>
        <li><span class="icon-inter"></span>520余家售后网点</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceBar'
}
</script>

<style scoped lang="scss">
@import '../assets/scss/mixin';
  .service{
    padding: 33px 0;
    color: #666666;
    font-size: 16px;
    li{
      display: inline-block;
      width: 19%;
      text-align: center;
      border-right: 1px solid #E5E5E5;
      span{
        margin-right: 8px;
        vertical-align: middle;
      }
      .icon-setting{
        @include bgimg(20px,20px,'../assets/imgs/icon-setting.png');
      }
      .icon-7day{
        @include bgimg(20px,20px,'../assets/imgs/icon-7day.png');
      }
      .icon-15day{
        @include bgimg(20px,20px,'../assets/imgs/icon-15day.png');
      }
      .icon-post{
        @include bgimg(20px,20px,'../assets/imgs/icon-post.png');
      }
      .icon-inter{
        @include bgimg(20px,20px,'../assets/imgs/icon-loc.png');
      }
    }
  }
</style>
