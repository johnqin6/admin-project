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
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    hidden: true,
    meta: {
      title: '404'
    }
  },
  {
    path: '/driver',
    name: 'driver',
    component: Home,
    redirect: '/drover/index',
    children: [
      {
        path: 'index',
        name: 'Driver-index',
        component: () => import('../views/DriverPage'),
        meta: {
          title: '引导指南',
          icon: 'el-icon-s-flag'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Home,
    redirect: '/list',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user-solid'
    },
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('../views/users/userList.vue'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-user-solid'
        }
      },
      {
        path: 'edit',
        name: 'user-edit',
        component: () => import('../views/users/userEdit.vue'),
        meta: {
          title: '用户编辑',
          icon: 'el-icon-user-solid'
        }
      }
    ]
  },
  {
    path: '*',
    name: '*404',
    redirect: '/404',
    hidden: true
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
