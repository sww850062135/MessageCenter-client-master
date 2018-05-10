<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>推送</el-breadcrumb-item>
        <el-breadcrumb-item>极光推送</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" class="el-form1" labelWidth="130px">
        <el-form-item prop="notification" label="推送内容">
          <el-input type="textarea" :autosize="{minRows: 2, maxRows: 4}" v-model="form.notification" placeholder="请在这里输入推送内容"></el-input>
        </el-form-item>
        <el-form-item label="目标平台(必选)">
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标人群">
          <el-radio-group v-model="radio">
            <el-radio-button label="广播(所有人)"></el-radio-button>
            <!--<el-radio-button label="设置标签(Tag)" disabled></el-radio-button>
            <el-radio-button label="设置别名(Alias)" disabled></el-radio-button>
            <el-radio-button label="Registration ID" disabled></el-radio-button>
            <el-radio-button label="用户分群推送" disabled></el-radio-button>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="message" label="message">
          <el-input type="textarea"  v-model="form.message" placeholder="请输入附带的message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.submit.prevent="send()">发送</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>


<script>
  import {jpush} from "../../api/api_push";

  export default {
    data(){
      return{
        form:{
          notification:'',
          message: '',
        },
        rules:{
          notification:[
            {required: true, message: '请输入推送内容', trigger: 'blur'},
          ],
          message:[
            {required: true, message: '请输入附带的message', trigger: 'blur'},
          ],
        },
        options:[{
          value: 'Android',
        },{
          value: 'apple开发环境',
          disabled: true
        },{
          value: 'apple生产环境',
          disabled: true
        },{
          value: 'windows',
          disabled: true
        }],
        value2: '',
        radio: '广播(所有人)',
      }
    },
    methods:{
      send(){
        let that = this;
        //alert("submit!");
        this.$refs.form.validate((valid) =>{
          if(valid){
            let args = {
              notification : this.form.notification,
              message: this.form.message,
            };
            jpush(args).then(data => {
              let {code, message} = data;
              if (code === 200){
                //that.$message.success(message);
                that.$notify({message: message, type: 'success', offset: 100});
                console.log(data);
                //that.$router.push({path:'/log/jpushlist'})
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
  .el-form1{
    width: 80%;
    padding-top: 50px;
  }
  .content-inner{
    width: 90%;
    padding-bottom: 60%;
    border: 1px solid #c4c5c5 ;
  }
  .title{
    padding-left: 200px;
    padding-top: 20px;
    font-size: 14px;
    color: #3a3a3a;
    font-weight: 700 ;
  }
</style>
