// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
Vue.use(Element)
Vue.config.productionTip = false

//访问前，检查是否登录过
router.beforeEach((to, from, next) => {
  console.log('to:'+to.path);
  if (to.path ==='/login'){
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !=='/login'){
    next({path: '/login'});
  }
  else {
    next();
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //使用store
  components: { App },
  template: '<App/>'

})
