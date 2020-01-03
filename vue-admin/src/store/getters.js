const getters = {
  token: state => state.user.token,
  userInfo: state => {
    return state.user.userInfo
  },
  opened: state => state.app.opened === 'true'
}
export default getters
