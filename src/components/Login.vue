<template>
  <div>
    <div class="login-img">
      <img src="../assets/login-img.png"/>
    </div>
    <el-form ref="AccountForm" :model="Account" :rules="rules" labelPosition="left" labelWidth="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="Account.username" autoComplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="Account.password" autoComplete="off" @keyup.enter.native="submitForm('Account')" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <!--<el-button @click="clearCookie" style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 5px;">忘记密码？</el-button>-->
      <el-form-item style="width: 100%;">
        <el-button type="primary" style="width: 100%;" @click.submit.prevent="submitForm('AccountForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import {requestLogin} from '../api/api_user';
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      ElButton,
      ElFormItem},
    data(){
      return{
        loading: false,
        Account:{
          username: '',
          password: '',
        },
        rules: {
          username:[
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{validator: validaePass}
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{validator: validaePass2}
          ]
        },
        checked: true
      };
    },
    methods:{
      submitForm(AccountForm){
        let that =this;
        this.$refs[AccountForm].validate((valid) => {
          if (valid) {
            this.loading = true;

            let loginParams = {username: this.Account.username, password: this.Account.password};
            //判断复选框是否被勾选，勾选则调用配置cookie方法
            if (that.checked==true){
              console.log("checked==true");
              //传入账号名，密码，保存天数三个参数
              that.setCookie(that.Account.username,that.Account.password,1);
            }else {
              console.log("清空Cookie");
              that.clearCookie();
            }
            //登录接口
            requestLogin(loginParams).then(data => {
              //debugger;
              that.loading = false;
              let {status, msg, result} =data;
              //console.log(data);
              if (status ==='success') {
                that.$store.commit('changeLogin', 'true');  //登录后改变登录状态 isLogin=true
                sessionStorage.setItem('user',JSON.stringify(result));
                console.log(sessionStorage.getItem('user'));
                that.$router.push({path:'/main'}/*{name: 'Home', params: {username:this.Account.username}}*/);
              } else {
                that.$message({message: msg, type: 'error'});
              }
            });
          }else{
            console.log('error submit!!');
            return false;
          }
        });
      },

      //设置cookie
      setCookie(c_name,c_pwd,exdays) {
        let exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userName"+ "=" +c_pwd+";path=/;expires="+exdate.toGMTString();
      },

      //获取cookie
      getCookie:function () {
        if (document.cookie.length>0){
          let arr = document.cookie.split('; ');//切割显示格式
          for (let i=0;i<arr.length;i++){
            let arr2 =arr[i].split('=');//再次切割
            //判断查找相对应的值
            if (arr2[0]=='username'){
              this.Account.username=arr2[1];//保存到保存数据的地方
            }else if (arr2[0]=='userPwd'){
              this.Account.password=arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie:function () {
        this.setCookie("","",-1);//修改2值都为空，天数为负1天
      },
      //页面加载调用获取cookie值
      mounted(){
        this.getCookie();
      }
    }
  }
</script>
<style scoped>
  @import '../assets/css/vue.css';
img{
  float: left;
  width: 400px;
  height: 400px;
}
</style>


