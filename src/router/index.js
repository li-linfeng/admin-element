import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */






export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]

//动态加载左侧的栏目

export const asyncRoutes = [
  {
    path: '/material',
    component: Layout,
    children: [
      {
        path: 'category',
        component: () => import('@/views/material/index'),
        name: 'Category',
        meta: { title: 'BOM池', icon: 'el-icon-collection' , api:"api.materials"}
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    children: [
      {
        path: 'project',
        component: () => import('@/views/project/index'),
        name: 'Project',
        meta: { title: '项目池', icon: 'el-icon-reading' , api:"api.projects"}
      }
    ]
  },
  {
    path: '/sale_request',
    component: Layout,
    children: [
      {
        path: 'saleRequest',
        component: () => import('@/views/saleRequest/saleRequest'),
        name: 'SaleRequest',
        meta: { title: '销售需求', icon: 'el-icon-paperclip', api:"api.sale_requests" }
      }
    ]
  },
  {
    path: '/pre_sale',
    component: Layout,
    children: [
      {
        path: 'preSale',
        component: () => import('@/views/preSale/preSale'),
        name: 'PreSale',
        meta: { title: '售前处理', icon: 'form' , api:"api.preSales"}
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/order'),
        name: 'Order',
        meta: { title: '订单', icon: 'el-icon-money', api:"api.order" }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'role',
        component: () => import('@/views/role/role'),
        name: 'Role',
        meta: { title: '角色', icon: 'el-icon-money', api:"api.roles" }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/user'),
        name: 'User',
        meta: { title: '用户', icon: 'el-icon-money', api:"api.users" }
      }
    ]
  },
  {
    path: '/handler',
    component: Layout,
    children: [
      {
        path: 'handler',
        component: () => import('@/views/handler/handler'),
        name: 'Handler',
        meta: { title: '人员管理', icon: 'el-icon-money', api:"api.handlers" }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: 'news',
        component: () => import('@/views/news/news'),
        name: 'News',
        meta: { title: '每日要闻', icon: 'el-icon-money', api:"api.news" }
      }
    ]
  },
    // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
