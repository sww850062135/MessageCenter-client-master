<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>推送</el-breadcrumb-item>
        <el-breadcrumb-item>邮件推送</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" labelWidth="100px">
        <el-form-item prop="email_to" label="收件账号">
          <el-input class="input" v-model="form.email_to"></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="主题">
          <el-input class="input" v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item prop="text" label="内容">
          <el-input class="input_text" v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.submit.prevent="send()">发送</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>



<script>
  import {sendEmail} from '../../api/api_push'


  export default {
    data(){
      return{
        form:{
          email_to:'',
          subject:'',
          text:'',
        },
        rules:{
            email_to:[
              {required: true, message: '请输入收件方', trigger: 'blur'},
              {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
            ],
            subject:[
              {required: true, message: '请输入主题', trigger: 'blur'},
            ],
            text:[
              {required: true, message: '请输入内容', trigger: 'blur'},
            ],
        },
      }
    },
    methods:{
      send(){
        let that = this;
        //alert("submit!");
        this.$refs.form.validate((valid) =>{
        if(valid){
          let args = {
            email_to : this.form.email_to,
            subject: this.form.subject,
            text: this.form.text,
          };
          sendEmail(args).then(data => {
            let {code, message} = data;
            if (code === 200){
              that.$message.success(message);
              console.log(data);
            }else {
              console.log(data);
              that.$message({message: message, type: "error"});
            }
          });
        }else {
          console.log("error send!")
        }
        });
      }
    }
  }
</script>


<style>
  .input{
    width: 80%;
    height: 40px;
    padding-top: 8px;
  }
  .input_text{
    width: 80%;
    height: 50px;
    padding-top: 8px;
  }
  .el-form{
    padding-top: 30px;
  }
</style>
