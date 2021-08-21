<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
   
    <!--订单表格-->
    
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
   
  </el-card>
</template>

<script>

export default {
  
  data() {
    return {
      tableData: [],
      total: 0,
      type: 3,
      pagenum: 1,
      pagesize: 8

    };
  },
  created() {
    
  },
  methods: {
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
