<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="">手机 电话卡</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">电视 盒子</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">笔记本 显示器</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">家电 插线板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">出行 穿戴</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">智能 路由器</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">电源 配件</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="">耳机 音响</a>
              <div class="children"></div>
            </li>
          </ul>
        </div>
        <swiper class="swiper-container" :options="swiperOption">
<!--          <swiper-slide v-for="(item,index) in slideList" :key="index">-->
<!--&lt;!&ndash;            <a :href="'/#/product/'+item.id"><img :src="item.img"></a>&ndash;&gt;-->
<!--            <img :src="item.img">-->
<!--          </swiper-slide>-->
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/'+item.id"><img :src="item.img" :alt="item.id"></a>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box"></div>
      <div class="banner"></div>
      <div class="product-box"></div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import 'swiper/css/swiper.css'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
export default {
  name: 'index',
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        effect: 'cube',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      },
      slideList: [
        {
          id: '31',
          img: require('../assets/imgs/slider/slide-1.jpg')
        },
        {
          id: '32',
          img: require('../assets/imgs/slider/slide-2.jpg')
        },
        {
          id: '33',
          img: require('../assets/imgs/slider/slide-3.jpg')
        },
        {
          id: '34',
          img: require('../assets/imgs/slider/slide-4.jpg')
        },
        {
          id: '35',
          img: require('../assets/imgs/slider/slide-5.jpg')
        }
      ]
    }
  },
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin";
  .index{
    .container{
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      .swiper-box{
        .nav-menu{
          position: absolute;
          width: 264px;
          height: 451px;
          z-index: 10;
          padding: 26px 0;
          background-color: #6666667a;
          box-sizing: border-box;
          .menu-wrap{
            .menu-item{
              height: 50px;
              line-height: 50px;
              a{
                position: relative;
                display: block;
                color: #ffffff;
                font-size: 16px;
                padding-left: 30px;
                &:after{
                  position: absolute;
                  top: 17.5px;
                  right: 30px;
                  content: ' ';
                  @include bgimg(10px,15px,'../assets/imgs/icon-arrow.png')
                }
              }
              &:hover{
                background-color: #FF6600;
              }
            }
          }
        }
        .swiper-container{
          height: 451px;
          .swiper-button-prev{
            left: 275px;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
