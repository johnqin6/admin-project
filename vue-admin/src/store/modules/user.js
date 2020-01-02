const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证
  userName: '',
  roles: ''
}

const mutations = {
  SET_TOKEN (state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN (state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
