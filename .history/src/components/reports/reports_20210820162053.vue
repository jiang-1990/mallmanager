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
  mounted(){
      this.userEcharts();
  },
  methods: {
   userEcharts(){
        //获取容器
        var myChart = echarts.init(document.getElementById('main'));
        //配置参数
        const option={
            title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
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
