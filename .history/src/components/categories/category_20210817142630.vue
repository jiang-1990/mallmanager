<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!--添加分类-->
    <el-button class="addClass" type="primary" plain>添加分类</el-button>
    <!--分类表格-->
    <el-table :data="tableData" style="width: 100%">
      <el-tree-grid 
      label="分类名称" 
      prop="cat_name"
      treeKey
      parentKey
      levelKey
      childKey
      >
      </el-tree-grid>
      <!-- <el-table-column label="分类名称" prop="cat_name">
      </el-table-column> -->
      
      <el-table-column label="级别">
        <template slot-scope="scope">
        <span v-if="scope.row.cat_level===0">一级</span>
        <span v-else-if="scope.row.cat_level===1">二级</span>
        <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      
      <el-table-column label="是否有效">
         <template slot-scope="scope">
        <span v-if="scope.row.cat_deleted===false">有效</span>
        <span v-else-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <el-button
          plain
          size="small"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          plain
          size="small"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!--编辑商品弹窗-->
  </el-card>
</template>

<script>
var ElTreeGrid = require('element-tree-grid');
export default {
  //引入elemen-tree-grid
  component:{
    ElTreeGrid
  },
  data() {
    return {
      tableData: [],
      total: 0,
      type: 3,
      pagenum: 1,
      pagesize: 6,
    };
  },
  created() {
    this.getGoodClassList();
  },
  methods: {
    //获取商品分类数据列表
    async getGoodClassList() {
      const res = await this.$http.get(
        `categories?type=${this.type}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.pagenum = data.pagenum;
        this.pagesize = data.pagesize;
        this.total = data.total;
        this.tableData = data.result;
        // //处理表格数据显示
        // this.tableData.forEach((item) => {
        //   item.cat_deleted = "false" ? "无效" : "有效";
        //   if (item.cat_level === 0) {
        //     item.cat_level = "一级";
        //   }
        // });
      } else {
        this.$message({ type: "warring", message: msg });
      }
      console.log(this.tableData);
    },
    // 分页相关方法
    handleSizeChange(val) {
      // 每页显示条数变化时触发
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagesize=1
      this.getGoodClassList();
    },
    handleCurrentChange(val) {
      // 当前页改变触发
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoodClassList();
    },
  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
.addClass {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
