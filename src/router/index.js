import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',//登录
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/forgot',//忘记密码
    name: 'Forgot',
    component: () => import('../views/Forgot.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'bookshelf',//书架
        name: 'Bookshelf',
        component: () => import('../views/Bookshelf.vue'),
      },
      {
        path: 'rinking',//排行榜
        name: 'Rinking',
        component: () => import('../views/Rinking.vue'),
      },
      {
        path: 'class',//分类
        name: 'Class',
        component: () => import('../views/Class.vue'),
      },
      {
        path: 'my',//我的
        name: 'My',
        component: () => import('../views/My.vue'),
      },
    ],
  },
  {
    path: '/search',//搜索
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/secure',//安全中心
    name: 'Secure',
    component: () => import('../views/Secure.vue'),
  },
  {
    path: '/rinkingList/:_id',//排行榜列表
    name: 'RinkingList',
    component: () => import('../views/RinkingList.vue'),
  },
  {
    path: '/classList',//分类列表
    name: 'ClassList',
    component: () => import('../views/ClassList.vue'),
  },
  {
    path: '/listDetail',//列表详情
    name: 'ListDetail',
    component: () => import('../views/ListDetail.vue'),
  },
  {
    path: '/read',//阅读
    name: 'Read',
    component: () => import('../views/Read.vue'),
  },
  {
    path: '/myvip',//我的会员
    name: 'Myvip',
    component: () => import('../views/Myvip.vue'),
  },
  {
    path: '/shudou',//书豆
    name: 'Shudou',
    component: () => import('../views/Shudou.vue'),
  },
  {
    path: '/account',//个人资料
    name: 'Account',
    component: () => import('../views/Account.vue'),
  },
  {
    path: '*',
    redirect: {
      name: 'My'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
