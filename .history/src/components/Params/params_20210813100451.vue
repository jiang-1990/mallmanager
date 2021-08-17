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
    <!--表格-->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="username" label="属性名称" width="180">
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
    <!--编辑商品弹窗-->
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
    this.getCanshuList();
  },
  methods: {
    //获取动态参数或静态参数列表
    async getCanshuList(){
      const id = this.selectedOptions[this.selectedOptions.length-1];
      const res = await this.$http.get(`categories/${id}/attributes?sel=${this.activeName}`)
      console.log(res)
    },
    // 获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },
    handleChange() {
      this.getCanshuList();
      //console.log(this.selectedOptions);
    },
    handleClick (tab, event) {
      //console.log(this.activeName)
      this.getCanshuList();
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
