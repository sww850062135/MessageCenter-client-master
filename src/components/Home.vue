<template>
    <el-row class="container">
      <!--头部-->
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-title">
          <span style="font-size: 18px;color: #fff;">消息推送中心后台管理系统</span>
        </div>
        <div class="topbar-account">
          <el-dropdown trigger="click">
            <span class="el-dropdown userinfo-inner">
              <i class="iconfont icon-user"></i>{{username}}
              <i class="iconfont icon-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo('/user/profile')"><span style="color: #7ed2df;font-size: 14px;">个人信息</span></div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!--中间-->
      <el-col :span="24" class="main">
        <!--左侧导航-->
        <aside :class="{showSidebar:!collapsed}">
        <!--导航栏-->
        <el-menu
          class="el-menu-vertical-demo"
          backgroundColor="#373d41"
          textColor="#fff"
          activeTextColor="#ffd04b"
          @open="handleOpen" @close="handleClose"
          unique-opened
          router :collapse="collapsed">
          <el-menu-item index="/main">
            <i class="iconfont icon-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="push">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span slot="title">消息推送</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/push/email">邮件推送</el-menu-item>
              <el-menu-item index="/push/sms">短信推送</el-menu-item>
              <el-menu-item index="/push/jpush">极光推送</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="log">
            <template slot="title">
              <i class="el-icon-time"></i>
              <span slot="title">推送历史</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/log/emaillist">邮件推送</el-menu-item>
              <el-menu-item index="/log/smslist">短信推送</el-menu-item>
              <el-menu-item index="/log/jpushlist">极光推送</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/profile">个人信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        </aside>
        <!--内容区-->
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>
</template>


<script>
  import {logout} from "../api/api_user";

  export default {
    name: 'home',
    created(){
    },

    data() {
      return {
        isCollapsed: true,
        collapsed: false,
        username: "",
        defaultActiveIndex: '0'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url);
      },
      logout(){
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          logout().then(function(){
            sessionStorage.removeItem('user');
            that.$router.push('/login');
            console.log("退出登录成功！")
          },function (err) {
            that.$message.error(err.toString());
          }).catch(function (error) {
            console.log(error);
            that.$message.error('请求出现异常');
          })
        })
      }
    },
    mounted() {
      let user= sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.username = user.username || '';
        this.phone = user.phone || '';
        this.email = user.email || '';
      }
    }
  }
</script>


<style scoped>
  @import '../assets/css/vue.css';
  @import '../assets/iconfont.css';
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  aside {
    min-width: 50px;
    background: #373d41;
    width: 200px;
  }
</style>
