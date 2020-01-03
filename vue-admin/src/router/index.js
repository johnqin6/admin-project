import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-data'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    hidden: true,
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

export default router
