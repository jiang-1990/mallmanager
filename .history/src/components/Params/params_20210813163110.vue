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
        <!--表格-->
         <el-table :data="casnShulist" max-height="320" style="width: 100%">
      <el-table-column label="序号" width="60" type="index"> 
      </el-table-column>
      <el-table-column prop="attr_name" label="属性名称" width="180">
      </el-table-column>
      <el-table-column prop="attr_name" label="属性值" width="180">
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
      </el-tab-pane>
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary">设置参数</el-button>
        <!--表格-->
         <el-table :data="casnShulist" max-height="320" style="width: 100%">
      <el-table-column label="#" width="60" type="expand"> 
        <template slot-scope="scope">
          <el-tag
            :key="tag"
            v-for="tag in scope.row.attr_vals"
            closable
            :disable-transitions="false"
            @close="handleClose(scope.row,tag)">
           {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加参数</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="attr_name" label="属性名称" width="180">
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
      </el-tab-pane>
    </el-tabs>
    <!--编辑商品参数弹窗-->
    <el-dialog title="参数设置" :visible.sync="dialogFormVisibleEid">
    <el-form :model="edtForm">
      <el-form-item label="用户名：" :label-width="formLabelWidth">
        <el-input
          v-model="edtForm.username"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮 箱：" :label-width="formLabelWidth">
        <el-input v-model="edtForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电 话：" :label-width="formLabelWidth">
        <el-input v-model="edtForm.mobile" autocomplete="off"></el-input>
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
      activeName: 'only',
      //参数列表数据
      casnShulist:[],
      //tag添加参数
      inputVisible: false,
      inputValue: '',
      //编辑弹窗
      edtForm:{},
      dialogFormVisibleEid:false,
      formLabelWidth: '100px',
    }
  },
  created (){
    this.getGoodCate()
    this.getCanshuList();
  },
  methods: {
    //显示编辑弹窗
    showUserEditDia(row){
      this.dialogFormVisibleEid=true
      console.log(row)
    },
    //tag添加参数相关方法
    async handleClose(row,tag) {
        row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);
        //发起编辑请求
        const putData={
          attr_name: row.attr_name,
          attr_sel:row.attr_sel,
          attr_vals:row.attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`,putData)
        console.log(res)
      },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    async handleInputConfirm(row) {
        console.log(row)
        let inputValue = this.inputValue;
        if (inputValue) {
          row.attr_vals.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
        //发起编辑请求
        const putData={
          attr_name: row.attr_name,
          attr_sel:row.attr_sel,
          attr_vals:row.attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`,putData)
        console.log(res)
      },
    //获取动态参数或静态参数列表
    async getCanshuList(){
      const id = this.selectedOptions[this.selectedOptions.length-1];
      const res = await this.$http.get(`categories/${id}/attributes?sel=${this.activeName}`)
      this.casnShulist = res.data.data
      this.casnShulist.forEach((item) => {
        // item.attr_vals=item.attr_vals.trim().split(",")
        // 解决v-for遍历字符串会报错
        item.attr_vals =
          item.attr_vals.length === 0
            ? []
            : item.attr_vals.trim().split(",");
        this.tagList=item.attr_vals
      });
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
    },
    
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
.el-tag + .el-tag {
    margin-left: 10px;
  }
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
