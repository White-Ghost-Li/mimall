<template>
  <transition name="slide">
    <div class="modal" v-if="showModal">
      <div class="shadow"></div>
      <div :class="modalType" class="modal-container">
        <div class="modal-header">
          <span>{{title}}</span>
          <span class="close" @click="closeModal"></span>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button class="btn" v-if="isForSave" @click="submit">{{sureBtn}}</button>
          <button class="btn" v-if="isForClose" @click="closeModal">{{exitBtn}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    // 弹框类型：小框：small，中框：middle，大框：large，表单：from
    modalType: {
      type: String,
      default: 'from'
    },
    title: String,
    // 按钮类型：1：确定，2：取消，3确定取消：
    btnType: String,
    sureBtn: {
      type: String,
      default: '确定'
    },
    exitBtn: {
      type: String,
      default: '取消'
    },
    showModal: Boolean
  },
  computed: {
    isForSave () {
      return this.btnType === '1' || this.btnType === '3'
    },
    isForClose () {
      return this.btnType === '2' || this.btnType === '3'
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin";
  .modal{
    z-index: 11;
    @include position(fixed);
    &.slide-enter-active, &.slide-leave-active{
      transition: all .5s;
    }
    &.slide-enter, &.slide-leave-to{
      opacity: 0;
    }
    .shadow{
      @include position(fixed);
      background-color: #555555;
      opacity: 0.5;
    }
    .modal-container{
      @include position(absolute,50%,50%,670px,auto);
      background-color: #ffffff;
      transform: translate(-50%,-50%);
      .modal-header{
        height: 60px;
        background-color: #ffffff;
        padding: 0 25px;
        line-height: 60px;
        font-size: 16px;
        .close{
          @include positionImg(absolute,23px,25px,14px,14px,'../assets/imgs/icon-close.png');
          transition: transform .3s;
          color: #333333;
          &:hover{
            transform: scale(2);
          }
        }
      }
      .modal-body{
        padding: 39px 39px 50px;
        font-size: 14px;
      }
      .modal-footer{
        height: 81px;
        line-height: 82px;
        text-align: center;
        background-color: #ffffff;
        .btn{
          @include button(110px,30px)
        }
      }
    }
  }
</style>
