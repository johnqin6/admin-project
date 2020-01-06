const state = {
  opened: sessionStorage.getItem('open')
    ? sessionStorage.getItem('open') : 'false',
  isMessageShow: false
}
const mutations = {
  SET_OPENED (state, payload) {
    state.opened = String(payload)
    sessionStorage.setItem('open', payload)
  },
  SET_MESSAGESHOW (state, payload) {
    state.isMessageShow = payload
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
