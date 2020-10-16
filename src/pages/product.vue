<template>
  <div class="product">
    <product-param :product-name="productName">
      <template v-slot:button>
        <button class="button">立即购买</button>
      </template>
    </product-param>
    <div class="container">
    </div>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
export default {
  name: 'product',
  computed: {
    productName () {
      let proName = ''
      switch (this.$route.params.id) {
        case '31': proName = '小米10至尊版1'; break
        case '32': proName = '小米10至尊版2'; break
        case '33': proName = '小米10至尊版3'; break
        case '34': proName = '小米10至尊版4'; break
        case '35': proName = '小米10至尊版5'; break
        default: proName = '电视'; break
      }
      return proName
    }
  },
  components: {
    ProductParam
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
  }
</style>
