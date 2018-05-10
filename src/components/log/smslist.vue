<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>日志</el-breadcrumb-item>
        <el-breadcrumb-item>短信推送记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="wrap-main" :span="24">
      <!--功能栏-->
      <el-col class="toolbar" :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.mobile"  placeholder="手机号"  style="padding-top: 20px" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="primary" @click="addSms">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!--列表-->
    <el-table :data="smsList" highlightCurrentRow @selection-change="selsChange" height="600" border style="width: 100%;">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form labelPosition="left" inline class="demo-table-expand">
            <el-form-item label="template ID">
              <span>{{props.row.templateid}}</span>
            </el-form-item>
            <el-form-item label="接收号码">
              <span>{{props.row.mobile}}</span>
            </el-form-item>
            <el-form-item label="短信类型">
              <span>{{props.row.smsType}}</span>
            </el-form-item>
            <el-form-item label="发送内容">
              <span>{{props.row.sms_content}}</span>
            </el-form-item>
            <el-form-item label="发送时间">
              <span>{{props.row.sendtime}}</span>
            </el-form-item>
            <el-form-item label="发送状态">
              <span>{{props.row.sms_status}}</span>
            </el-form-item>
            <el-form-item label="模版中替换参数">
              <span>{{props.row.temp}}</span>
            </el-form-item>
            <el-form-item label="uid">
              <span>{{props.row.uid}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="sendtime" label="发送时间" width="190" sortable></el-table-column>
      <el-table-column prop="mobile" label="接收号码" width="190" sortable></el-table-column>
      <el-table-column prop="sms_status" label="发送状态" width="190" sortable></el-table-column>
      <el-table-column prop="sms_content" label="发送内容" sortable></el-table-column>
    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchDeleteEmail" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </el-row>
</template>


<script>
  import {getSmsList, getSmsListByMobile} from "../../api/api_push";

  export default {
    data(){
      return{
        filters:{
          mobile:'',
        },
        smsList:[],
        total: 0,
        pageNum: 1,
        pageSize: 10,
        sels: [],  //列表选中的列
      }
    },
    methods:{
      handleCurrentChange(val) {
        this.pageNum = val;
        this.search();
      },
      handleSearch(){
        this.total = 0;
        this.pageNum = 1;
        this.search();
      },
      //获取sms列表
      search: function () {
        let that = this;
        let params = {
          pageNum: that.pageNum,
          pageSize: 10,
          mobile: that.filters.mobile
        };
        console.log(params);
        if (params.mobile==="") {
          getSmsList(params).then(data => {
            let {status, result} = data;
            console.log(data);
            that.loading = false;
            if (status === "success") {
              that.total = result.total;
              that.smsList = result;
            } else {
              that.$message({message: result});
            }
          })
        }else {
          getSmsListByMobile(params).then(data => {
            let {status, msg, result} = data;
            console.log(data);
            that.loading = false;
            if (status === "success") {
              that.total = result.total;
              that.smsList = result;
            } else {
              that.$message({message: msg, type: 'warning', center: true});
            }
          })
        }
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //新增短信
      addSms(){
        this.$router.push({path:'/push/sms'});
      },
      //批量删除
      batchDeleteEmail(){

      },
    },
  }
</script>


<style>
  .demo-table-expand {
    font-size: 0;
    margin-left: 140px;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-bottom: 0;
    width: 50%;
  }
</style>
