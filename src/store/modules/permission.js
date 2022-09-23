import  {asyncRoutes, constantRoutes } from '@/router'
import { getUserPermissions } from '@/api/permission' // 获取路由的接口方法


function hasPermission(permissions, route){
  if (route.meta){
    return permissions.indexOf(route.meta.api) >= 0
  }else{
    return  true
  }
}

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */
export function filterAsyncRoutes(routes, permissions) {
    var res = []
    routes.forEach(route =>{
      const tmp ={...route}
   
      if (hasPermission(permissions, route)){
          if (tmp.children){
            tmp.children = filterAsyncRoutes(tmp.children, permissions)
          }
          res.push(tmp)
      } 
    })
 return res
}

const state = {
 routes: [],
 addRoutes: [],
 permissions:[],
}

const mutations = {
 SET_ROUTES: (state, routes) => {
  state.addRoutes = routes // 路由访问
  state.routes = constantRoutes.concat(routes) // 菜单显示
  },
  RESET_ROUTER: (state, routes) => {
    state.routes = []
  },
  SET_PERMISSIONS: (state, permissions)=>{
    state.permissions = permissions
  }

}

const actions = {
  generateRoutes({commit}) {
    return new Promise(async resolve => {
        var accessedRoute
        const permissionsData = await getUserPermissions() // 获取到后台路由
    
        if  (permissionsData.data.indexOf('*') >=0 ){
          accessedRoute = asyncRoutes || []
        }else{
          accessedRoute = filterAsyncRoutes(asyncRoutes, permissionsData.data) // 对路由格式进行处理
        }
        commit('SET_ROUTES', accessedRoute)
        commit('SET_PERMISSIONS', permissionsData.data)
        resolve(accessedRoute)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}