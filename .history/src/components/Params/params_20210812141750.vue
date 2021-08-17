<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert
    title="只允许为第三级分类设置参数"
    type="warning">
  </el-alert>
    <!--选择分类-->
    <span>请选择商品分类</span>
    <el-select
      class="input-search"
      :filter-method="getOptionData()"
      v-model="value"
      filterable
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!--tab-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">静态参数</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">动态参数</el-tab-pane>
    </el-tabs>
    <!--编辑商品弹窗-->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      // tab
      activeName: 'first'
    }
  },
  created () {},
  methods: {
    getOptionData () {
      console.log(1)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.input-search {
  width: 300px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
