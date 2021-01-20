<template>

  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="权限管理" level2="列表管理"></my-bread>
    <!--表格-->
    <el-table :data="listData" style="width: 100%">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="层级"> 
          <template slot-scope="scope">
              
          </template>
      </el-table-column>
      
    </el-table>
    <!--分页-->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
    };
  },
  created (){
      this.getRightList()
  },
  methods:{
      async getRightList(){
          //设置请求头
          const token = localStorage.getItem('token')
          this.$http.defaults.headers.common['Authorization']=token
          const res = await this.$http.get(`rights/list`)
          const {data,meta:{msg,status}}=res.data
          if(status===200){
              this.$message.success(msg)
              this.listData=data
          }
          console.log(res);
      }
  }
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
