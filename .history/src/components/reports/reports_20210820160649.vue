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
//var myChart = echarts.init(document.getElementById('main'));
// myChart.setOption(this.Option);
export default {
  
  data() {
    return {
      Option:{
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}
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
