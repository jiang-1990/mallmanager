<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="数据统计" level2="数据报表"></my-bread> 
    <!--数据报表-->
   <div id="main" style="width: 600px;height:400px;"></div>
    <!--翻页-->
  
    <!--修改订单弹窗-->
    
  </el-card>
</template>

<script>
var echarts = require('echarts');
export default {
  
  data() {
    return {
    };
  },
  created() {
    
  },
  methods: {
   userEcharts(){
        //获取容器
        var myChart = echarts.init(document.getElementById('main'));
        //配置参数
        const option={
            
        }
        //生成报表
        myChart.setOption(option);
   },
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
