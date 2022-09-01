import  { constantRoutes } from '@/router'
import { getUserPermissions } from '@/api/permission' // 获取路由的接口方法
import Layout from '@/layout'


// 映射路由表
const route_map = {
  "api.categories":{
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'category',
        component: () => import('@/views/category/category'),
        name: 'Category',
        meta: { title: '分类', icon: 'el-icon-collection' }
      }
    ]
  },
  "api.projects":{
    path: '/project',
    component: Layout,
    children: [
      {
        path: 'project',
        component: () => import('@/views/project/index'),
        name: 'Project',
        meta: { title: '项目', icon: 'el-icon-reading' }
      }
    ]
  },
  "api.sale_requests": {
    path: '/sale_request',
    component: Layout,
    children: [
      {
        path: 'saleRequest',
        component: () => import('@/views/saleRequest/saleRequest'),
        name: 'SaleRequest',
        meta: { title: '销售需求', icon: 'el-icon-paperclip' }
      }
    ]
  },
  "api.preSales":{
    path: '/pre_sale',
    component: Layout,
    children: [
      {
        path: 'preSale',
        component: () => import('@/views/preSale/preSale'),
        name: 'PreSale',
        meta: { title: '工程售前', icon: 'form' }
      }
    ]
  },
  "api.order":{
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/order'),
        name: 'Order',
        meta: { title: '订单', icon: 'el-icon-money' }
      }
    ]
  },
  "api.roles": {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'role',
        component: () => import('@/views/role/role'),
        name: 'Role',
        meta: { title: '角色', icon: 'el-icon-money' }
      }
    ]
  },
  "api.users":{
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/user'),
        name: 'User',
        meta: { title: '用户', icon: 'el-icon-money' }
      }
    ]
  },
};

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */
export function getAsyncRoutes(routes) {
 var res = []
 var index = routes.indexOf('*')
 if (index >=0) {
    res = Object.values(route_map)
 }else{
    keys = Object.keys(route_map)
    routes.forEach(item =>{
      var seq= keys.indexOf(item)
      if (seq >=0){
        res.push(route_map.item)
      }
    })
 }
 return res
}

const state = {
 routes: [],
 addRoutes: []
}

const mutations = {
 SET_ROUTES: (state, routes) => {
  state.addRoutes = routes // 路由访问
  state.routes = constantRoutes.concat(routes) // 菜单显示
  }
}

const actions = {
  generateRoutes({commit},roles) {
    return new Promise(async resolve => {
        const routes = await getUserPermissions() // 获取到后台路由
        const asyncRoutes = getAsyncRoutes(routes.data) // 对路由格式进行处理
        commit('SET_ROUTES', asyncRoutes)
        resolve(asyncRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}