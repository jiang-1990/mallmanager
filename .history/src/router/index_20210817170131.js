import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Rights from '@/components/rights/right'
import Roles from '@/components/roles/role'
import Goods from '@/components/goods/goodList'
import Params from '@/components/Params/params'
import Categories from '@/components/categories/category'
import Goodsadd from '@/components/goods/goodsadd'
import Order from '@/components/order/order'
import { Message } from 'element-ui'

Vue.use(Router)
/*
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
*/
// 在路由配置生效之前判断token
// 路由守卫
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/add',
          name: 'goodsadd',
          component: Goodsadd
        },
        {
          path: '/params',
          name: 'params',
          component: Params
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        }
        {
          path: '/orders',
          name: 'orders',
          component: Orders
        }
      ]
    }
  ]
})
// 在路由配置生效之前判断token
// 路由守卫
// 路由守卫在路由生效之前
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 如果去的是登录 next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果去的不是登录，判断token
    // 获取token
    const token = localStorage.getItem('token')
    // if token 有 > 继续渲染组件
    // console.log(token)
    // token 没有 > 登录
    if (!token) {
      Message.warning('您未登陆，请登录')
      // this.$router.push({name:'login'})
      router.push({name: 'login'})
    } else {
      next()
    }
  }
})
export default router
