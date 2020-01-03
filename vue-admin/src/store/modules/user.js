const state = {
  token: localStorage.getItem('token')
    ? localStorage.getItem('token') : '', // 认证凭证
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {}
}

const mutations = {
  SET_TOKEN (state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN (state) {
    state.token = ''
    localStorage.setItem('userInfo', '')
  },
  SET_USERINFO (state, payload) {
    state.userInfo = payload
    state.userInfo.id = payload.id
    state.userInfo.username = payload.username
    state.userInfo.identity = payload.identity
    state.userInfo.avatar = payload.avatar
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
