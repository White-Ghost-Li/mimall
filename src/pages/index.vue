<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item" v-for="(name, dex) in menuList" :key="dex">
              <a href="">{{name}}</a>
              <div class="children">
                <ul v-for="(list, index) in childList" :key="index">
                  <li v-for="(item, ind) in list" :key="ind">
                    <a :href="'/product/'+item.id">
                      <img :src="item.img" alt="item.name">
                      {{item.name}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <swiper class="swiper-container" :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/product/'+item.id"><img :src="item.img" :alt="item.id"></a>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/product/'+item.id" v-for="(item, index) in adsList" :key="index">
          <img v-lazy="item.img" alt="item.id">
        </a>
      </div>
      <div class="banner">
        <a href="/product/50">
          <img v-lazy="require('../assets/imgs/banner-1.png')" alt="banner">
        </a>
      </div>
      <div class="product-box">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/product/60">
              <img v-lazy="require('../assets/imgs/mix-alpha.jpg')" alt="60">
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <div class="item" v-for="(item, j) in arr" :key="j" @click="goToCart">
                <span :class="item.title==='新品' ? 'new-pro':'kill-pro'">{{item.title}}</span>
                <div class="item-img">
                  <img v-lazy="item.img" alt="item.name">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.bei}}</p>
                  <p class="price">{{item.price}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <Modal modal-type="small"
           title="提示"
           btn-type="1"
           sure-btn="查看购物车"
           :show-modal="showModal"
           @submit="submit"
           @closeModal="closeModal"
    >
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
<!--      <p slot="body">商品添加成功!</p>-->
    </Modal>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import Modal from '../components/Modal'
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
      ],
      childList: [
        [
          {
            id: '01',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          },
          {
            id: '02',
            name: 'Redmi K30 至尊纪念版',
            img: require('../assets/imgs/item-box-2.png')
          },
          {
            id: '03',
            name: 'Redmi 10X Pro',
            img: require('../assets/imgs/item-box-3.jpg')
          },
          {
            id: '04',
            name: 'Redmi 9',
            img: require('../assets/imgs/item-box-4.jpg')
          },
          {
            id: '05',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          },
          {
            id: '06',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          }
        ],
        [
          {
            id: '07',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          },
          {
            id: '08',
            name: 'Redmi K30 至尊纪念版',
            img: require('../assets/imgs/item-box-2.png')
          },
          {
            id: '09',
            name: 'Redmi 10X Pro',
            img: require('../assets/imgs/item-box-3.jpg')
          },
          {
            id: '10',
            name: 'Redmi 9',
            img: require('../assets/imgs/item-box-4.jpg')
          },
          {
            id: '11',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          },
          {
            id: '12',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          }
        ],
        [
          {
            id: '13',
            name: '小米10至尊纪念版',
            img: require('../assets/imgs/item-box-1.png')
          },
          {
            id: '14',
            name: 'Redmi K30 至尊纪念版',
            img: require('../assets/imgs/item-box-2.png')
          },
          {
            id: '15',
            name: 'Redmi 10X Pro',
            img: require('../assets/imgs/item-box-3.jpg')
          },
          {
            id: '16',
            name: 'Redmi 9',
            img: require('../assets/imgs/item-box-4.jpg')
          }
        ]
      ],
      menuList: ['手机 电话卡', '电视 盒子', '笔记本 显示器', '家电 插线板', '出行 穿戴', '智能 路由器', '电源 配件', '耳机 音响'],
      adsList: [
        {
          id: 51,
          img: require('../assets/imgs/ads/ads-1.png')
        },
        {
          id: 52,
          img: require('../assets/imgs/ads/ads-2.jpg')
        },
        {
          id: 53,
          img: require('../assets/imgs/ads/ads-3.png')
        },
        {
          id: 54,
          img: require('../assets/imgs/ads/ads-4.jpg')
        }
      ],
      phoneList: [
        [
          {
            id: 61,
            title: '新品',
            img: require('../assets/imgs/nav-img/nav-1.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          },
          {
            id: 62,
            title: '新品',
            img: require('../assets/imgs/nav-img/nav-2.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          },
          {
            id: 63,
            title: '秒杀',
            img: require('../assets/imgs/nav-img/nav-3.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          },
          {
            id: 64,
            title: '新品',
            img: require('../assets/imgs/nav-img/nav-4.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          }
        ],
        [
          {
            id: 65,
            title: '新品',
            img: require('../assets/imgs/nav-img/nav-1.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          },
          {
            id: 66,
            title: '秒杀',
            img: require('../assets/imgs/nav-img/nav-2.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          },
          {
            id: 67,
            title: '新品',
            img: require('../assets/imgs/nav-img/nav-3.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          },
          {
            id: 68,
            title: '新品',
            img: require('../assets/imgs/nav-img/nav-4.png'),
            name: '小米10至尊版',
            price: '5299元起',
            bei: '120X变焦/120W秒充/120Hz刷新率'
          }
        ]
      ],
      showModal: false
    }
  },
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Modal
  },
  mounted () {
    // this.getHeaderProduct()
  },
  methods: {
    // getHeaderProduct () {
    //   this.axios.get('/productList').then((res) => {
    //     console.log(res)
    //   })
    // },
    goToCart () {
      this.showModal = true
    },
    submit () {
      this.showModal = false
      // 提交数据
    },
    closeModal () {
      this.showModal = false
    }
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
          z-index: 9;
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
                .children{
                  display: flex;
                  width: 962px;
                }
              }
              .children{
                background-color: aqua;
                display: none;
                height: 450px;
                top: 0;
                left: 264px;
                position: absolute;
                border: 1px solid #B0B0B0;
                ul{
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  height: 450px;
                  li{
                    height: 75px;
                    line-height: 75px;
                    width: 240px;
                    padding-left: 23px;
                    a{
                      color: #333333;
                      font-size: 14px;
                      img{
                        width: 43px;
                        height: 35px;
                        vertical-align: middle;
                        margin-right: 10px;
                      }
                    }
                  }
                }
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
      .ads-box{
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        margin-bottom: 31px;
        a{
          width: 296px;
          height: 167px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .banner{
        margin-bottom: 50px;
      }
      .product-box{
        background-color: #fffaf7;
        padding: 30px 0 50px;
        h2{
          font-size: 22px;
          height: 21px;
          line-height: 21px;
          color: #333333;
          margin-bottom: 20px;
        }
        .wrapper{
          display: flex;
          .banner-left{
            margin-right: 16px;
            img{
              width: 224px;
              height: 619px;
            }
          }
          .list-box{
            .list{
              display: flex;
              justify-content: space-between;
              margin-bottom: 14px;
              .item{
                width:237px;
                height: 302px;
                margin-right: 10px;
                background-color: white;
                text-align: center;
                &:hover{
                  z-index: 10;
                  box-shadow: 0 4px 8px 0 #000;
                }
                &:last-child{
                  margin-right: 0;
                }
                span{
                  display: inline-block;
                  width: 67px;
                  height: 24px;
                  font-size: 14px;
                  line-height: 24px;
                  color: white;
                  &.new-pro{
                    background-color: #7ECF68;
                  }
                  &.kill-pro{
                    background-color: #E82626;
                  }
                }
                .item-img{
                  img{
                    width: 100%;
                    height: 195px;
                  }
                }
                .item-info{
                  h3{
                    font-size: 14px;
                    color: #333333;
                    line-height: 14px;
                    font-weight: bold;
                  }
                  p{
                    color: #999999;
                    line-height: 13px;
                    margin: 6px auto 13px;
                  }
                  .price{
                    color: #F20A0A;
                    font-size: 14px;
                    font-weight: bold;
                  }
                }
              }
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  a{
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
