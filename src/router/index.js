import Vue from 'vue'
import Router from 'vue-router'

// 路由全加载
import Home from '@/pages/Home'
import Index from '@/pages/index'
// import Product from '@/pages/product'
// import Login from '@/pages/login'
// import Detail from '@/pages/detail'
// import Cart from '@/pages/cart'
// import Order from '@/pages/order'
// import List from '@/pages/list_pagination'
// import List from '@/pages/list_button'
// import List from '@/pages/list_scroll'
// import OrderPay from '@/pages/orderpay'
// import Confirm from '@/pages/confirm'
// import AliPay from '@/pages/alipay'

// 路由懒加载
const Product = () => import('@/pages/product')
const Detail = () => import('@/pages/detail')
const Login = () => import('@/pages/login')
const Cart = () => import('@/pages/cart')
const Order = () => import('@/pages/order')
const List = () => import('@/pages/list_pagination')
const OrderPay = () => import('@/pages/orderpay')
const AliPay = () => import('@/pages/alipay')
const Confirm = () => import('@/pages/confirm')

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
          // 路由懒加载方法1
          // component: resolve => require(['@/pages/product.vue'], resolve)
        },
        {
          path: 'detail/:id',
          name: 'Detail',
          // 路由懒加载方法2
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
