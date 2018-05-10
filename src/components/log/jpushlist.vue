<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="{path: '/'}"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>日志</el-breadcrumb-item>
        <el-breadcrumb-item>极光推送记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="wrap-main">
      <!-- 功能栏-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.notification" placeholder="通知内容" @keyup.enter.native="handleSearch" style="padding-top: 20px"></el-input>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item style="padding-top: 20px">
            <el-button type="primary" @click="addJPush">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!--列表-->
    <el-table :data="jPushList" highlightCurrentRow @selection-change="selsChange" height="600" border style="width: 100%;">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form labelPosition="left" inline class="demo-table-expand">
            <el-form-item label="Message ID">
              <span>{{props.row.msg_id}}</span>
            </el-form-item>
            <el-form-item label="推送平台">
              <span>{{props.row.platform}}</span>
            </el-form-item>
            <el-form-item label="audience">
              <span>{{props.row.audience}}</span>
            </el-form-item>
            <el-form-item label="notification">
              <span>{{props.row.notification}}</span>
            </el-form-item>
            <el-form-item label="message">
              <span>{{props.row.message}}</span>
            </el-form-item>
            <el-form-item label="sendno">
              <span>{{props.row.sendno}}</span>
            </el-form-item>
            <el-form-item label="推送时间">
              <span>{{props.row.pushtime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="notification" label="通知内容" width="200" sortable></el-table-column>
      <el-table-column prop="platform" label="推送平台" width="300" sortable></el-table-column>
      <el-table-column prop="pushtime" label="发送时间" sortable></el-table-column>
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
  import {getJPushList, getJPushListByNotification} from "../../api/api_push"
  export default {
    data() {
      return {
        filters:{
          notification:'',
        },
        jPushList:[],
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
      //获取jpush列表
      search: function () {
        let that = this;
        let params = {
          pageNum: that.pageNum,
          pageSize: 10,
          notification: that.filters.notification
        };
        console.log(params);
        if (params.notification==="") {
          getJPushList(params).then(data => {
            let {status, result} = data;
            console.log(data);
            that.loading = false;
            if (status === "success") {
              that.total = result.total;
              that.jPushList = result;
            } else {
              that.$message({message: result});
            }
          })
        }else {
          getJPushListByNotification(params).then(data => {
            let {status, msg, result} = data;
            console.log(data);
            that.loading = false;
            if (status === "success") {
              that.total = result.total;
              that.jPushList = result;
            } else {
              that.$message({message: msg, type: 'warning', center: true});
            }
          })
        }
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //新增发通知
      addJPush(){
        this.$router.push({path:'/push/jpush'});
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
