const getters = {
  token: state => state.user.token,
  userInfo: state => {
    return state.user.userInfo
  },
  opened: state => state.app.opened === 'true',
  isMessageShow: state => state.app.isMessageShow
}
export default getters
