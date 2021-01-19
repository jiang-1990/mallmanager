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
      <el-input
        @clear="loadUserList()"
        placeholder="请输用户名"
        v-model="query"
        class="inputSearch"
        clearable
      >
        <el-button
          @click="seachUser()"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="showAddUserDia()">添加用户</el-button>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密 码：" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱：" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电 话：" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
      </el-dialog>
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
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showUserEditDia(scope.row)"
            size="small"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisibleEid">
            <el-form :model="form">
              <el-form-item label="用户名：" :label-width="formLabelWidth">
                <el-input
                  v-model="form.username"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮 箱：" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电 话：" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleEid = false">取 消</el-button>
              <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
            @click="showSetUserRoleDia(scope.row)"
            size="small"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-dialog title="角色分配" :visible.sync="dialogFormVisibleRole">
            <el-form :model="form">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                {{currRoleId}}
              </el-form-item>
              <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="currRoleId">
                  <el-option label="请选择" :value="-1"></el-option>
                  <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roles" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisibleRole = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <el-button
            @click="showUserDeleMsgBox(scope.row.id)"
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
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
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 10,
      //表格绑定的数据
      userlist: [],
      total: -1,
      dialogFormVisible: false,
      dialogFormVisibleEid: false,
      dialogFormVisibleRole: false,
      form: {
        username: "",
        password: "",
        emaill: "",
        mobile: "",
      },
      //角色分配
      currRoleId: -1,
      formLabelWidth: "100px",
      currusername:'',
      roles: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //用户角色修改
    async showSetUserRoleDia(user){
      this.currusername=user.username
      //获取所有的角色
      const resr = await this.$http.get('roles')
      this.roles = resr.data.data
      console.log(this.roles)
      //获取该用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      const {data:{rid},meta:{msg,status}} = res.data
      if(status===200){
        this.currRoleId=rid
      }
      console.log(res)
      this.dialogFormVisibleRole=true
    
    },
    //修改状态
    async changeMgState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      //console.log(res)
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
    },

    //编辑用户发送请求
    async editUser() {
      //console.log(this.form)
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleEid = false;
      }
    },
    //编辑用户
    showUserEditDia(user) {
      this.form = user;
      this.dialogFormVisibleEid = true;
    },
    //删除用户
    showUserDeleMsgBox(userId) {
      this.$confirm("删除用户？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userId}`);
          const {
            data,
            meta: { msg, status },
          } = res.data;
          if (status === 200) {
            this.getUserList();
            this.$message({
              type: "success",
              message: msg,
            });
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加用户
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    //添加用户提交报保存方法
    async addUser() {
      const res = await this.$http.post(`users`, this.form);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 201) {
        //添加成功
        this.dialogFormVisible = false; //关闭对话框
        this.getUserList(); //更新视图
        this.form = {}; //清空数据
        this.$message.success(msg); //提示信息
      }
      console.log(res);
    },
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
      //console.log(this.userlist);
    },
    //分页相关方法
    handleSizeChange(val) {
      //每页显示条数变化时触发
      //console.log(`每页 ${val} 条`);
      this.pagesize = val;
      //this.pagesize=1
      this.getUserList();
    },
    handleCurrentChange(val) {
      //当前页改变触发
      //console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    //搜索用户方法
    seachUser() {
      this.getUserList();
    },
    //点击搜索框的X重新加载数据的方法
    loadUserList() {
      this.getUserList();
    },
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
