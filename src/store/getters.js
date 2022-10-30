const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  add_routes:state => state.permission.addRoutes,
  permission_routes: state => state.permission.routes,
  permissions: state => state.permission.permissions 
}
export default getters
