<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

      <el-col :span="24" class="warp-main">
        <el-form ref="form" :model="form" :rules="rules" labelWidth="80px">
          <el-form-item label="账号">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
  </el-row>
</template>


<script>
  import {bus} from '../../bus'
  import {changeProfile}  from '../../api/api_user'
  export default {
    data(){
      return{
        loading: false,
        form:{
          id: '',
          username: '',
          phone: '',
          email: ''
        },
        rules:{
          phone:[
            {required: true, message: '请输入手机', trigger: 'blur'}
          ],
          email:[
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ]
        },
      }
    },
    methods:{
      handleSaveProfile(){
        let that = this;
        that.$refs.form.validate((valid) =>{
          if (valid) {
            that.loading = true;
            let args = {
              id: that.form.id,
              phone: that.form.phone,
              email: that.form.email
            };
            changeProfile(args).then(data => {
              let {status, msg, result} = data;
              that.loading = false;
              if (status === "success") {
                //修改成功
                sessionStorage.setItem('user', JSON.stringify(result));
                let user = JSON.parse(window.sessionStorage.getItem('user'));
                user.phone = that.form.phone;
                user.email = that.form.email;
                sessionStorage.setItem('user', JSON.stringify(user));
                that.$message({message: msg});
              } else {
                that.$message({message: msg});
              }
            });
          }else {
            console.log('error change!!');
            return false;
          }
        });
      }
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.form.id = user.id;
        this.form.username = user.username;
        this.form.email = user.email || '';
        this.form.phone = user.phone || '';
      }
    }
  }
</script>


<style>
</style>
