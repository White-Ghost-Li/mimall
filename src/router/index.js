import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Product from '@/pages/product'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Detail from '@/pages/detail'
import Cart from '@/pages/cart'
import Order from '@/pages/order'
import List from '@/pages/list'
import OrderPay from '@/pages/orderpay'
import Confirm from '@/pages/confirm'
import AliPay from '@/pages/alipay'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          path: 'product/:id',
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
      path: '/login',
      name: 'Login',
      component: Login
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
          path: 'confirm',
          name: 'confirm',
          component: Confirm
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
