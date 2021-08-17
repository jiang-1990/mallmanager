<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert class="war" title="只允许为第三级分类设置参数" type="warning">
  </el-alert>
    <!--选择分类-->
    <el-form>
    <el-form-item label="请选择商品分类">
      <el-cascader
        expandTrigger="hover"
        :options="options"
        v-model="selectedOptions"
        :props="defaultProp"
        :show-all-levels="false"
        clearable
        @change="handleChange"
      ></el-cascader>
    </el-form-item>
    </el-form>
    <!--tab-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="静态参数" name="only">
        <el-button type="primary">设置参数</el-button>
      </el-tab-pane>
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary">设置参数</el-button>
      </el-tab-pane>
    </el-tabs>
    <!--编辑商品弹窗-->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 级联选择器
      options: [],
      selectedOptions: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      value: '',
      // tab
      activeName: 'only'
    }
  },
  created (){
    this.getGoodCate()
  },
  methods: {
    // 获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },
    handleChange() {
      console.log(this.selectedOptions);
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
.war{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
