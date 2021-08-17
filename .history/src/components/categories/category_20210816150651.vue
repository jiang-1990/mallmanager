<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!--添加分类-->
    <el-button class="addClass" type="primary" plain>添加分类</el-button>
    <!--分类表格-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
      <el-table-column label="级别" prop="cat_level"></el-table-column>
      <el-table-column label="是否有效" prop="cat_deleted"></el-table-column>
      <el-table-column label="操作">
        <el-button plain size="small" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button plain size="small" type="danger" icon="el-icon-delete" circle></el-button>
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
export default {
  data () {
    return {
      tableData: [],
      total:0,
      type:1,
      pagenum:1,
      pagesize:6,
    }
  },
  created (){
    this.getGoodClassList();
  },
  methods:{
    //获取商品分类数据列表
    async getGoodClassList(){
      const res = await this.$http.get(`categories?type=${this.type}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data,meta:{msg,status}}=res.data
      if(status===200){
        this.pagenum=data.pagenum
        this.pagesize=data.pagesize
        this.total=data.total
        this.tableData=data.result
        //处理表格数据显示
        this.tableData.forEach(item => {
          console.log(item.cat_deleted===false)
          item.cat_deleted===false?"无效":"有效"
        });
      }else{
         this.$message({type: 'warring',message: msg});
      }
      console.log(res);
    },
    // 分页相关方法
    handleSizeChange (val) {
      // 每页显示条数变化时触发
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      // this.pagesize=1
      this.getGoodClassList();
    },
    handleCurrentChange (val) {
      // 当前页改变触发
      // console.log(`当前页: ${val}`);
      this.pagenum = val
      this.getGoodClassList();
    },
  }
}
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
