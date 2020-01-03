const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证
  userInfo: {
    id: '',
    username: '',
    identity: '',
    avatar: ''
  }
}

const mutations = {
  SET_TOKEN (state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN (state) {
    state.token = ''
  },
  SET_USERINFO (state, payload) {
    state.userInfo = payload
    state.userInfo.id = payload.id
    state.userInfo.username = payload.username
    state.userInfo.identity = payload.identity
    state.userInfo.avatar = payload.avatar
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
