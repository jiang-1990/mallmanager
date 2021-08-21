<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="数据统计" level2="数据报表"></my-bread> 
    <!--报表-->
   <div id="main" style="width: 600px;height:400px;"></div>
    <!--翻页-->
  
    <!--修改订单弹窗-->
    
  </el-card>
</template>

<script>
var echarts = require('echarts');
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
export default {
  
  data() {
    return {
      
    };
  },
  created() {
    
  },
  methods: {
   
  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
