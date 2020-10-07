import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Product from '@/pages/product'
import Index from '@/pages/index'
import Detail from '@/pages/detail'
import Cart from '@/pages/cart'
import Order from '@/pages/order'
import List from '@/pages/list'
import OrderPay from '@/pages/orderpay'
import AliPay from '@/pages/alipay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        },
        {
          path: 'detail/:id',
          name: 'Detail',
          component: Detail
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      children: [
        {
          path: 'list',
          name: 'List',
          component: List
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'ali-Pay',
          component: AliPay
        }
      ]
    }
  ]
})
