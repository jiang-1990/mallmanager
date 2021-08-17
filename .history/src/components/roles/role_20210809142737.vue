<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!--按钮-->
    <el-row class="addBtn">
      <el-col>
        <el-button @click="addRoleBox()" type="primary" plain
          >添加角色</el-button
        >
        <el-dialog title="添加角色" :visible.sync="addRoleDiaVisible">
          <el-form :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :label-width="formLabelWidth">
              <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addRoleDiaVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRole()">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table
      height="430"
      :data="roleList"
      border
      style="width: 100%; margin-bottom: 20px;margin-top:15px"
    >
      <el-table-column type="expand" label="#" width="60">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag class="tag" closable @close="deletRight(scope.row, item1.id)">{{
                item1.authName
              }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag class="tag"
                    closable
                    @close="deletRight(scope.row, item2.id)"
                    type="success"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag class="tag"
                    @close="deletRight(scope.row, item3.id)"
                    type="info"
                    v-for="(item3, i) in item2.children"
                    :key="i"
                    closable
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length == 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" sortable width="60">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" sortable width="250">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" sortable width="250">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="EditRoleDia(scope.row)"
            size="small"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>

          <el-button
            @click="RightSetDia(scope.row)"
            size="small"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>

          <el-button
            @click="deleteRole(scope.row.id)"
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <!--编辑角色弹窗-->
          <el-dialog title="修改角色" :visible.sync="EditRoleDiaVisible">
            <el-form :model="form">
              <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-input v-model="form.roleName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" :label-width="formLabelWidth">
                <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="EditRoleDiaVisible = false">取 消</el-button>
              <el-button type="primary" @click="EditRole()">确 定</el-button>
            </div>
          </el-dialog>
          <!--权限分配弹窗-->
          <el-dialog title="权限设置" :visible.sync="RightRoleDiaVisible">
            <!--树结构权限列表-->
            <el-tree
              ref="tree"
              :data="dataTree"
              show-checkbox
              node-key="id"
              default-expand-all
              :default-checked-keys="allcheck"
              :props="defaultProps"
            >
            </el-tree>
            <div slot="footer" class="dialog-footer">
              <el-button @click="RightRoleDiaVisible = false">取 消</el-button>
              <el-button type="primary" @click="RightSet()">确 定</el-button>
            </div>
          </el-dialog>
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
      roleList: [],
      form: {
        roleName: '',
        roleDesc: ''
      },
      roleId: '',
      formLabelWidth: '100px',
      addRoleDiaVisible: false,
      EditRoleDiaVisible: false,
      RightRoleDiaVisible: false,
      dataTree: [],
      allexpand: [], // 放所有权限的id
      allcheck: [], // 当前角色有的所有权限id
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 权限分配设置
    async RightSet () {
      // 获取所有被选中的权限节点(全选中状态和半选中状态)
      const arr1 = this.$refs.tree.getCheckedKeys()
      const arr2 = this.$refs.tree.getHalfCheckedKeys()
      // 合并arr1和arr2
      const arr = [...arr1, ...arr2]
      // 发起权限设置请求
      const res = await this.$http.post(`roles/${this.roleId}/rights`, {rids: arr.join(',')})
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.RightRoleDiaVisible = false
        this.getRoleList()
        this.$message.success(res.data.meta.msg)
      }
    },
    // 打开权限分配对话框
    async RightSetDia (role) {
      // 获取当前角色有的所有权限id
      const arrtemp1 = []
      role.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arrtemp1.push(item3.id)
          })
        })
      })
      this.allcheck = arrtemp1
      this.RightRoleDiaVisible = true
      this.roleId = role.id
      // 获取所有权限列表
      const res = await this.$http.get(`rights/tree`)
      // console.log(res);
      const {
        data,
        meta: {status}
      } = res.data
      if (status === 200) {
        // 将所有权限列表赋值给dataTree
        this.dataTree = data
        /*
        //将所有权限的id放入数组allexpand中，遍历datatree
        const arrtemp1 = []
        this.dataTree.forEach(item1 =>{
          arrtemp1.push(item1.id)
          item1.children.forEach(item2 =>{
            arrtemp1.push(item2.id)
            item2.children.forEach(item3 =>{
              arrtemp1.push(item3.id)
            })
          })
        })
        this.allexpand=arrtemp1
        */
      }
    },
    // 编辑修改角色
    async EditRole () {
      // 发起修改请求
      const res = await this.$http.put(`roles/${this.roleId}`, this.form)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.EditRoleDiaVisible = false
        this.form = {}
        this.getRoleList()
      } else {
        this.$message.warning(res.data.meta.msg)
      }
    },
    // 修改角色弹窗
    EditRoleDia (role) {
      this.EditRoleDiaVisible = true
      this.form.roleName = role.roleName
      this.form.roleDesc = role.roleDesc
      this.roleId = role.id
    },
    // 删除角色权限
    async deletRight (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(res)
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        role.children = data
        // this.getRoleList()
        this.$message.success(msg)
      }
    },
    // 删除角色
    deleteRole (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发起删除请求
          const res = await this.$http.delete(`roles/${id}`)
          const {
            meta: { msg, status }
          } = res.data
          if (status === 200) {
            this.$message.success(msg)
            this.getRoleList()
          } else {
            this.$message.warning(msg)
          }
        })
        .catch(() => {
          this.$message.info('已取消删除!')
        })
    },
    // 添加角色
    addRoleBox () {
      this.addRoleDiaVisible = true
    },
    // 发起添加角色请求
    async addRole () {
      const res = await this.$http.post(`roles`, this.form)
      // console.log(res)
      const {

        meta: { msg, status }
      } = res.data
      if (status === 201) {
        this.$message.success(msg)
        this.addRoleDiaVisible = false
        this.getRoleList()
        this.form = {}
      }
    },
    // 获取角色列表
    async getRoleList () {
      // 设置请求头
      // const token = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get('roles')
      // console.log(res);
      const {
        data,
        meta: {status}
      } = res.data
      if (status === 200) {
        this.roleList = data
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.addBtn {
  margin-top: 20px;
}
.tag{
  margin-top: 5px;
}
</style>
