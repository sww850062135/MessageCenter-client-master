<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>推送</el-breadcrumb-item>
        <el-breadcrumb-item>短信推送</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="wrap-main">
      <el-form ref="form" :model="form" :rules="rules" class="el-form1" labelWidth="130px">
        <el-form-item label="发送形式">
          <el-select v-model="select1" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号码">
          <el-input type="textarea" class="el-textarea" v-model="form.mobile"
                    placeholder="请输入手机号(若群发，多个手机号以英文逗号分隔,最多单次支持100个号码，如果号码重复，则只发送一条，暂仅支持国内号码)">
          </el-input>
        </el-form-item>
        <el-form-item prop="templateid" label="短信模版ID">
          <el-select v-model="select2" placeholder="请选择">
            <el-option-group
              v-for="group in options2"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="内容预览">
          <el-input type="textarea"  :disabled="true" class="textarea" readonly="readonly"></el-input>
        </el-form-item>-->
        <el-form-item prop="temp" label="替换参数">
          <el-input type="textarea" class="el-textarea" v-model="form.temp"
                    placeholder="请输入模版中的替换参数，如该模版不存在参数则参数为空；若有多个参数，以英文逗号分隔">
          </el-input>
        </el-form-item>
        <el-form-item prop="uid" label="透传ID">
          <el-input class="el-input" v-model="form.uid" placeholder="请输入透传ID(可不填)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.submit.prevent="sendSms()">发送</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>


<script>
  import {sendSms, sendSmsBatch} from "../../api/api_push";

  export default {
    data(){
      return{
        form: {
          mobile: '',
          temp: '',
          uid: ''
        },
        rules: {
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          /*templateid: [
            {required: true, message: '请选择短信模版', trigger: 'blur'},
          ],*/
        },
        select1: '',
        options1: [{
          value: '指定模版单发'
        },{
          value: '指定模版群发'
        }],
        select2: '',
        options2: [{
          label: '通知模版',
          options: [{
            value: '通知模版1',
            label: '314338'
          }, {
            value: '通知模版2',
            label: '314404'
          },{
            value: '通知模版3',
            label: '314402'
          },{
            value: '通知模版4',
            label: '316692'
          },{
            value: '通知模版5',
            label: '314049'
          }]
        }, {
          label: '验证码模版',
          options: [{
            value: '验证码模版1',
            label: '314379'
          },{
            value: '验证码模版2',
            label: '316691'
          },{
            value: '验证码模版3',
            label: '314048'
          },{
            value: '验证码模版4',
            label: '316694'
          }]
        }],

      }
    },
    methods: {
      sendSms(){
        let that = this;
        this.$refs.form.validate((valid) =>{
          if (valid){
            let sendType = that.select1;
            console.log(this.select2);
            console.log(sendType);
            let args = {
              mobile: that.form.mobile,
              templateid: that.select2,
              temp: that.form.temp,
              uid: that.form.uid
            };
            console.log(args);
            if (sendType==="指定模版单发"){
              sendSms(args).then(data =>{
                let {code, message} = data;
                if (code === 200){
                  that.$notify({message: message, type: 'success'});
                  //that.$router.push({path:'/log/smslist'})
                }else {
                  that.$message({message: message, type: 'error'});
                }
              });
            }else {
              sendSmsBatch(args).then(data =>{
                let {code, message} = data;
                if (code===200){
                  that.$notify({message: message, type: 'success'});
                  //that.$router.push({path: '/log/smslist'})
                }else {
                  that.$message({message: message, type: 'error'});
                }
              });
            }
          }else {
            console.log("error send!")
          }
        });
      }
    },

  }
</script>


<style>
  .el-form1{
    width: 80%;
    padding-top: 50px;
  }
  .textarea{
    width: 50%;
  }
</style>
