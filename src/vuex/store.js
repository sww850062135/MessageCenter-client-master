import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);

const state = {
  isLogin: false,    //初始状态 isLogin=false 表示用户未登录
  User:{
    id:'',
    username:'',
    phone:'',
    email:'',
  },
};

const mutations = {
  changeLogin(state, data){
    state.isLogin = data;
    let user = localStorage.getItem('user');
    //state.User.id = user.id;
    /*state.User.username = user.username;
    state.User.phone = user.phone;
    state.User.email = user.email;*/

  }
};

export default new Vuex.Store({
  state,
  mutations,
});
