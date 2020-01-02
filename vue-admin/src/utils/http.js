import axios from 'axios'
import Qs from 'qs'
import { Loading, Message } from 'element-ui' // 引用element-ui的加载和消息提示组件
import store from '../store'
import router from '../router'

// 创建axios实例
const $axios = axios.create({
  // 设置超时时间
  timeout: 10 * 1000
})
// 设置post请求头
// $axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 在全局请求和响应拦截器中添加请求状态
let loading = null
/**
 * 跳转登陆页
 * 携带当前页面路由，以其在登陆页完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
/**
 * 请求失败后的错误统一处理
 * @param {*} status 请求状态码
 * @param {*} other 其他
 */
const errorHandle = (status, other) => {
  switch (status) {
    // 401: 未登录状态，跳转登录页面
    case 401:
      toLogin()
      break
    // 403 token过期，清除token并跳转登陆页
    case 403:
      Message.error('登录过期，请重新登录！')
      localStorage.removeItem('token')
      store.commit('DEL_TOKEN')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404 请求不存在
    case 404:
      Message.error('请求的资源不存在！')
      break
    default:
      console.log(other)
  }
}

/**
 * 请求拦截
 * 用于处理请求前添加loading、判断是否已保存token，并在每次请求头部添加token
 */
$axios.interceptors.request.use(config => {
  loading = Loading.service({ text: '拼命加载中' })
  let token = store.getters.token
  if (token) {
    config.headers.Authorization = token // 请求头部添加token
  }
  return config
}, error => Promise.error(error))

/**
 * 响应拦截
 */
$axios.interceptors.response.use(res => {
  if (loading) {
    loading.close()
  }
  // 请求成功
  // return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data)
  const code = res.status
  if (((code >= 200 && code < 300) || code === 304) && res.data.error === 0) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, error => {
  if (loading) {
    loading.close()
  }
  if (error.response) {
    // 请求已发出，但是不在2xx的范围
    errorHandle(error.response.status, error.response.data.message)
    Message.error(error.response.data.message)
  } else {
    // 请求超时或者网络有问题
    if (error.message.includes('timeout')) {
      Message.error('请求超时！请检查网络是否正常！')
    } else {
      Message.error('请求超时！请检查网络是否连接！')
    }
  }
  return Promise.reject(error)
})

$axios.get = (url, params) => {
  return $axios({
    method: 'get',
    url,
    params
  })
}

$axios.post = (url, data) => {
  return $axios({
    method: 'post',
    url,
    data: Qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

export default $axios
