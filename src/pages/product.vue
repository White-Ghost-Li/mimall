<template>
  <div class="product">
    <product-param :product-name="product.name">
      <template v-slot:button>
        <button class="button" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="">全球首款双频 GP</a><span>|</span>
          <a href="">骁龙845</a><span>|</span>
          <a href="">AI 变焦双摄</a><span>|</span>
          <a href="">红外人脸识别</a><span>|</span>
        </p>
        <div class="price">
          <span>￥<em>2599</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper class="swiper-container" :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideLists" :key="index">
            <img :src="item" :alt="index">
          </swiper-slide>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>当 PatchWall 遇上巨幕电视轻松控制全屋智能设备</h2>
        <p>PatchWall 电视系统不仅可以根据喜好精准推荐，还可以轻松查看和控制智能家居设备，在 MAX 巨幕上显示消息推送、摄像头画中画毫无压力，看电视也不错过宝宝房间的一举一动。</p>
        <div class="video-bg" @click="showSlide='slideDown'"></div>
        <div class="video-box">
          <div class="overlay" v-if="showSlide==='slideDown'"></div>
          <div class="video" :class="showSlide">
            <span class="icon-close" @click="showSlide='slideUp'"></span>
            <video src="../assets/imgs/product/video.mp4" controls></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
export default {
  name: 'product',
  data () {
    return {
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        freeMode: true
      },
      slideLists: [
        require('../assets/imgs/product/gallery-2.png'),
        require('../assets/imgs/product/gallery-3.png'),
        require('../assets/imgs/product/gallery-4.png'),
        require('../assets/imgs/product/gallery-5.jpg'),
        require('../assets/imgs/product/gallery-6.jpg')
      ],
      showSlide: '',
      product: {}
    }
  },
  mounted () {
    this.getProductInfo()
  },
  methods: {
    getProductInfo () {
      let id = this.$route.params.id
      this.axios.get(`/products/${id}`).then((res) => {
        this.product = res
      })
    },
    buy () {
      let id = this.$route.params.id
      this.$router.push(`/detail/${id}`)
    }
  },
  components: {
    ProductParam,
    Swiper,
    SwiperSlide
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin';
  .product{
    .button{
      @include button(110px,30px);
      margin-left: 10px;
    }
    .content{
      .item-bg{
        background: url("../assets/imgs/product/product-bg-1.png") no-repeat center;
        height: 718px;
        text-align: center;
        h2{
          font-size: 80px;
          padding-top: 55px;
        }
        h3{
          font-size: 24px;
          letter-spacing: 10px;
        }
        p{
          margin-top: 21px;
          margin-bottom: 40px;
          a{
            font-size: 16px;
            color: #333333;
          }
          span{
            margin: 0 15px;
          }
        }
        .price{
          font-size: 30px;
          color: #333333;
          em{
            font-style: normal;
            font-size: 38px;
          }
        }
      }
      .item-bg-2{
        background: url("../assets/imgs/product/product-bg-2.png") no-repeat center;
        height: 480px;
        background-size: 1226px 397px;
      }
      .item-bg-3{
        background: url("../assets/imgs/product/product-bg-3.png") no-repeat center;
        height: 638px;
        background-size: cover;
      }
      .item-swiper{
        margin: 36px auto 52px;
        .desc{
          font-size: 18px;
          color: #333333;
          text-align: center;
        }
        img{
          width: 100%;
        }
      }
      .item-video{
        height: 1044px;
        background-color: #070708;
        margin-bottom: 76px;
        color: #ffffff;
        text-align: center;
        h2{
          font-size: 60px;
          padding-top: 82px;
          margin-bottom: 47px;
        }
        p{
          font-size: 24px;
          margin-bottom: 58px;
        }
        .video-bg{
          background: url("../assets/imgs/product/gallery-1.png") no-repeat center;
          background-size: cover;
          width: 1226px;
          height: 540px;
          margin: 0 auto 120px;
          cursor: pointer;
        }
        .video-box{
          .overlay{
            @include position(fixed);
            background-color: #333333;
            opacity: .4;
            z-index: 9;
          }
          @keyframes slideDown {
            from{
              top: -50%;
              opacity: 0;
            }
            to{
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from{
              top: 50%;
              opacity: 1;
            }
            to{
              top: -50%;
              opacity: 0;
            }
          }
          .video{
            position: fixed;
            top: -50%;
            left: 50%;
            width: 1000px;
            height: 536px;
            transform: translate(-50%,-50%);
            z-index: 10;
            opacity: 0;
            &.slideDown{
              animation: slideDown .6s linear;
              top: 50%;
              opacity: 1;
            }
            &.slideUp{
              animation: slideUp .6s linear;
            }
            .icon-close{
              @include positionImg(absolute,20px,20px,20px,20px,'../assets/imgs/icon-close.png');
              border-radius: 50%;
              cursor: pointer;
              z-index: 13;
              transition: transform .3s;
              &:hover{
                background-color: #FF6600;
                transform: scale(1.5) rotateZ(180deg);
              }
            }
            video{
              width: 1000px;
              height: 100%;
              object-fit: cover;
              outline: none;
              z-index: 12;
            }
          }
        }
      }
    }
  }
</style>
