<template>

  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!--表格-->
    <el-table :data="listData" style="width: 100%" height="530">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="层级">
          <template scope="scope">
              <span v-if="scope.row.level=='0'">一级</span>
              <span v-if="scope.row.level=='1'">二级</span>
              <span v-if="scope.row.level=='2'">三级</span>
          </template>
      </el-table-column>
    </el-table>
    <!--分页-->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      listData: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      // 设置请求头
      const token = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`rights/list`)
      const {data, meta: {msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.listData = data
      }
      // console.log(res);
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
