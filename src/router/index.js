import Vue from 'vue'
import Router from 'vue-router'
import {online} from '@/api/login'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Cookies from 'js-cookie'

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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/dashboard',
    // path: '/',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard',needLogin: true}
    }]
  },
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/dashboard/index'),
  },



  {
    path: '/example',
    component: Layout,
    redirect: '/example/table2',
    name: 'Example',
    meta: { title: '报表列表', icon: 'example' },
    children: [
      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: 'Table', icon: 'table' }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // },
      {
        path: 'table1',
        name: 'Table1',
        component: () => import('@/views/table/table1'),
        meta: { title: '当日全额消费卡记录', icon: 'table' }
      },
      {
        path: 'table2',
        name: 'Table2',
        component: () => import('@/views/table/table2'),
        meta: { title: '多次同消费金额记录', icon: 'table' }
      },
      {
        path: 'table3',
        name: 'Table3',
        component: () => import('@/views/table/table3'),
        meta: { title: '商户消费TOP20排名', icon: 'table' }
      },
      {
        path: 'table4',
        name: 'Table4',
        component: () => import('@/views/table/table4'),
        meta: { title: '商户类别统计', icon: 'table' }
      },
      {
        path: 'table5',
        name: 'Table5',
        component: () => import('@/views/table/table5'),
        meta: { title: '系统库存卡统计', icon: 'table' }
      },
      {
        path: 'table6',
        name: 'Table6',
        component: () => import('@/views/table/table6'),
        meta: { title: '人行售卡查询-按客户', icon: 'table' }
      },
      {
        path: 'table7',
        name: 'Table7',
        component: () => import('@/views/table/table7'),
        meta: { title: '人行售卡查询-按面值', icon: 'table' }
      },
      {
        path: 'table8',
        name: 'Table8',
        component: () => import('@/views/table/table8'),
        meta: { title: '单卡多次消费记录', icon: 'table' }
      }
    ]
  },

/*  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '信息管理', icon: 'form' }
      }
    ]
  },*/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('navigation-guards');
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const nextRoute = ['home', 'good-list', 'good-detail', 'cart', 'profile'];
  let token = Cookies.get('Admin-Token')
  if(to.path!='login'){
    online(token).then(()=>{
      console.log('offfff')
      console.log(token+'2222222')
      next();
    }).catch(()=>{
      console.log('gggggg')
      router.push({ path: 'login' })
      next();
    })
  }
  next();
/*  // 已登录状态；当路由到login时，跳转至home
  if (to.path === 'login') {
    if (isLogin) {
      router.push({ name: 'home' });
    }
  }*/

});




export default router
