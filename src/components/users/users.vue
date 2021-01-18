<template>
  <el-card class="box-card">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <div style="margin-top: 15px">
      <el-input @clear="loadUserList()" placeholder="请输用户名" v-model="query" class="inputSearch" clearable>
        <el-button @click="seachUser()" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary">添加用户</el-button>
    </div>
    <!--表格-->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">{{
          scope.row.create_time | fmdate
        }}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button size="small" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="small" plain type="success" icon="el-icon-check" circle></el-button> 
          <el-button size="small" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      //表格绑定的数据
      userlist: [],
      total: -1,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表数据的方法
    async getUserList() {
      //query    | 查询参数     | 可以为空
      //pagenum  | 当前页码     | 不能为空
      //pagesize | 每页显示条数 | 不能为空
      //需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const token = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token; //设置请求头
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      //console.log(res.data)
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        //给表格数据赋值
        this.userlist = users;
        //给total赋值
        this.total = total;
        //提示
        this.$message.success(msg);
      } else {
        //提示
        this.$message.warning(msg);
      }
      console.log(this.userlist);
    },
    //分页相关方法
    handleSizeChange(val) {//每页显示条数变化时触发
      //console.log(`每页 ${val} 条`);
      this.pagesize=val
      //this.pagesize=1
      this.getUserList()
    },
    handleCurrentChange(val) {//当前页改变触发
      //console.log(`当前页: ${val}`);
      this.pagenum=val
      this.getUserList()
    },
    //搜索用户方法
    seachUser(){
      this.getUserList()
    },
    //点击搜索框的X重新加载数据的方法
    loadUserList(){
      this.getUserList()
    }

  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
</style>
