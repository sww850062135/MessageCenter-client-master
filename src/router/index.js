import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import UserProfile from '@/components/user/profile'
import Email from '@/components/push/email'
import Jpush from '@/components/push/jpush'
import Sms from '@/components/push/sms'
import Emaillist from '@/components/log/emaillist'
import Smslist from '@/components/log/smslist'
import Jpushlist from '@/components/log/jpushlist'
import Main from '@/components/Main'
/**
 * 加载模块
 */
Vue.use(Router)

/**
 *配置路由
 */
const router =  new Router({
  routes: [
    { //登录
      path: '/',
      name: 'login',
      component: resolve=> require(['@/components/Login'], resolve)
    },
    {
      path: '/login',
      name: '登录',
      component: resolve=> require(['@/components/Login'], resolve),
    },

    {
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
    },
    {
      path: '/',
      component:Home,
      name: '首页',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      iconCls: 'iconfont icon-home', //图标样式class
      children: [
        {path: '/main', component: Main, name: '首页'},
      ]
    },
    {
      path: '/',
      component:Home,
      name: '推送历史',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      iconCls: 'iconfont icon-time', //图标样式class
      children: [
        {path: '/log/emaillist', component: Emaillist, name: '邮件推送'},
        {path: '/log/smslist', component: Smslist, name: '短信推送'},
        {path: '/log/jpushlist', component: Jpushlist, name: '极光推送'},
      ]
    },
    {
      path: '/',
      component:Home,
      name: '推送',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      iconCls: 'iconfont icon-message', //图标样式class
      children: [
        {path: '/push/email', component: Email, name: '邮件推送'},
        {path: '/push/jpush', component: Jpush, name: '极光推送'},
        {path: '/push/sms', component: Sms, name: '短信推送'},
      ]
    },
    {
      path: '/',
      component:Home,
      name: '设置',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      iconCls: 'iconfont icon-setting1', //图标样式class
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息'},
        //{path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    },
  ]
})

//访问之前，检查是否已登录
/*router.beforeEach((to, from, next) =>{
  console.log('to:'+to.path)
  if (to.path.startsWith('/login')){
    window.localStorage.removeItem('access-user')
    next()
  }else {
    let token = JSON.stringify(window.localStorage.getItem('access-user'))
    if (token){
      next({path: '/login'})
    }
  }
})*/
export default router

