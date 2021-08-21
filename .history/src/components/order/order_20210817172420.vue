<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="订单管理" level2="订单列表"></my-bread> 
    <!--订单表格-->
    <el-table :data="tableData" style="width: 100%" height="500px">
        <el-table-column type="index" width="60" label="序号"> </el-table-column>
      <el-table-column prop="order_id" label="订单编号">
      </el-table-column>
      <el-table-column prop="order_price" label="价格">
      </el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货">
      </el-table-column>
      <el-table-column prop="create_time" label="下单时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            @click="showEditGoodDia(scope.row)"
            size="small"
            plain
            type="primary"
            icon="el-icon-edit"
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
      query:'',
      pagenum: 1,
      pagesize: 8

    };
  },
  created() {
    this.getTableData()
  },
  methods: {
    //编辑
    showEditGoodDia(row){
        console.log(row)
    },
    //获取订单表格数据
    async getTableData(){
        const res = await this.$http.get(`orders?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
        this.tableData=res.data.data.goods
        console.log(res)
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
.el-table {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
