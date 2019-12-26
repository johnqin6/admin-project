import axios from 'axios'
import { Loading, Message } from 'element-ui' // 引用element-ui的加载和消息提示组件

// 创建axios实例
const $axios = axios.create({
  // 设置超时时间
  timeout: 10 * 1000
})
// 设置post请求头
$axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded'

// 在全局请求和响应拦截器中添加请求状态
let loading = null

/**
 * 请求拦截
 */
$axios.interceptors.request.use(config => {
  loading = Loading.service({ text: '拼命加载中' })
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
  if (error.response) {
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

export default $axios
