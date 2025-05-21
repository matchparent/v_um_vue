import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommodityList from '../views/CommodityList.vue'
import CommodityDetail from '@/views/CommodityDetail.vue'
import Login from '@/views/Login.vue'
import store from '@/store';
import Cart from '@/views/Cart.vue'
import OrderConfirm from '@/views/OrderConfirm.vue'
import Profile from '@/views/Profile.vue'
import OrderPay from '@/views/OrderPay.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: "Urchin Mall - Home"
    },
    component: HomeView
  },

  {
    path: '/commodities/:keyword/:orderby?',
    name: 'commodity_list',
    meta: {
      title: "Commodity List"
    },
    component: CommodityList
  },
  {
    path: '/commodity/:cid',
    name: 'commodity_detail',
    meta: {
      title: "Commodity Detail",
      // login: true
    },
    component: CommodityDetail
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "Login"
    },
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      title: "Cart",
      // login: true
    },
    component: Cart
  },{
    path: '/orderConfirm/:trade_no',
    name: 'orderConfirm',
    meta: {
      title: "Confirm your order"
    },
    component: OrderConfirm
  },{
    path: '/profile',
    name: 'profile',
    meta: {
      title: "User profile"
    },
    component: Profile
  },{
    path: '/orderPay',
    name: 'orderPay',
    meta: {
      title: "Cash Register"
    },
    component: OrderPay
  },{
    path: '/:pathMatch(.*)*',
    name: 'Page not found',
    meta: {
      title: "404 - Page not found"
    },
    component: PageNotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from) => {
  document.title = to.meta.title
  if (to.meta.login && !store.state.user.isLogin) {
    router.push("/login")
  }
})


export default router
