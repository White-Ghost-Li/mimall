<template>
  <div class="login">
    <div class="container">
      <a href="/">
        <img v-lazy="require('../assets/imgs/login-logo.png')" alt="首页">
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登陆</span>
            <span class="sep-line">|</span>
            <span>扫码登陆</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="userName">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
          </div>
          <div class="btn-box">
            <button class="btn" @click="login">登陆</button>
          </div>
          <div class="tips">
            <div class="sms">手机短信登陆/注册</div>
            <div class="reg" @click="register">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      usrId: ''
    }
  },
  mounted () {
    if (this.$cookie.get('userInfo')) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      let {userName, password} = this
      this.axios.post('/login', {
        userName,
        password
      }).then((res) => {
        this.$cookie.set('userInfo', res, {expires: '1M'})
        this.$store.dispatch('saveUserName', userName)
        this.$store.dispatch('saveCart', res.cartList)
        this.$router.push('/index')
      })
    },
    register () {
      this.axios.post('/register', {
        userName: 'L',
        password: '123',
        email: 'root@163.com'
      }).then((res) => {
        this.userName = res.userName
        this.password = res.password
        this.$message.success('注册成功')
      })
    }
  },
  components: {
    NavFooter
  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin";
  .login{
    &>.container{
      height: 113px;
      img{
        width: auto;
        height: 100%;
      }
    }
    .wrapper{
      background: url("../assets/imgs/login-bg.jpg") no-repeat center;
      .container{
        height: 576px;
        position: relative;
        .login-form{
          box-sizing: border-box;
          padding-left: 31px;
          padding-right: 31px;
          width: 410px;
          height: 510px;
          background-color: #ffffff;
          position: absolute;
          bottom: 29px;
          right: 0;
          h3{
            line-height: 23px;
            font-size: 24px;
            text-align: center;
            margin: 40px auto 49px;
            .checked{
              color: #FF6600;
            }
            .sep-line{
              margin: 0 32px;
            }
          }
          .input{
            display: inline-block;
            width: 348px;
            height: 50px;
            margin-bottom: 20px;
            border: 1px solid #E5E5E5;
            input{
              @include input();
              width: 100%;
              height: 100%;
              border: none;
              padding: 18px;
            }
          }
          .btn{
            @include button(110px,30px);
            width: 100%;
            line-height: 50px;
            margin-top: 10px;
            font-size: 16px;
          }
          .tips{
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            cursor: pointer;
            .sms{
              color: #FF6600;
            }
            .reg{
              color: #999999;
              span{
                margin: 0 7px;
              }
            }
          }
        }
      }
    }
  }
</style>
