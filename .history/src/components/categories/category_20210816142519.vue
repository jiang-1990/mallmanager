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
      <el-table-column label="分类名称" prop="id"> </el-table-column>
      <el-table-column label="级别" prop="name"> </el-table-column>
      <el-table-column label="是否有效" prop="desc"> </el-table-column>
      <el-table-column label="操作">
        <el-button plain size="small" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button plain size="small" type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
    <!--编辑商品弹窗-->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      type:1,
      pagenum:1,
      pagesize:10,
    }
  },
  created (){
    this.getGoodClassList();
  },
  methods:{
    //获取商品分类数据列表
    async getGoodClassList(){
      const res = this.$http.get(`categories?type=${this.type}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res[[PromiseResult]]);
    }
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
