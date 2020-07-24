const getters = {
  //放全局数据
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  //合法的权限路径
  permission_routes: state => state.permission.routes,
  tokenSDP: state => state.user.tokenSDP,
  tokenUSERSDP: state => state.user.tokenUSERSDP,
}
export default getters
