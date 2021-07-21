<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!--搜索-->
    <el-input
     v-model="query"
     clearable
     placeholder="请输入商品编号"
     class="input-search">
      <el-button @click="searchGood()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button
      @click="$router.push({name:'goodsadd'})"
      type="primary"
      plain
      >添加商品</el-button>
    <!--商品列表-->
    <el-table :data="goodListData" height="480" border style="width: 100%">
      <el-table-column type="index" width="60" label="序号"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="600">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）" width="100">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100">
      </el-table-column>
      <el-table-column prop="add_time" label="创建日期" width="160">
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
            <el-button
            @click="deletGood(scope.row.goods_id)"
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
    <el-dialog title="编辑商品信息" :visible.sync="EditGoodDialog">
      <el-form :model="goodform">
        <el-form-item label="商品名称" :label-width="EditGoodDialogWidth">
          <el-input v-model="goodform.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="EditGoodDialogWidth">
          <el-input v-model="goodform.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" :label-width="EditGoodDialogWidth">
          <el-input v-model="goodform.goods_weight" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditGoodDialog = false">取 消</el-button>
        <el-button type="primary" @click="EditGood()">确 定</el-button>
      </div>
    </el-dialog>
    <!--查询商品弹窗-->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      goodListData: [],
      query: '',
      pagenum: '1',
      pagesize: '10000',
      // 编辑商品弹窗
      goodform: {},
      goodId: '',
      EditGoodDialog: false,
      EditGoodDialogWidth: '120px'

    }
  },
  created () {
    this.getGoodListData()
  },
  methods: {
    // 查询商品方法
    searchGood () {
      this.getGoodListData()
    },
    // 删除商品方法
    deletGood (id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除商品请求
        const res = await this.$http.delete(`goods/${id}`)
        console.log(res)
        this.$message.success('删除成功!')
        // 更新视图
        this.getGoodListData()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 编辑商品方法
    async EditGood () {
      // 发起修改数据请求
      const res = await this.$http.put(`goods/${this.goodId}`, this.goodform)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.EditGoodDialog = false
        // 更新视图
        this.getGoodListData()
      }
    },
    // 编辑商品弹窗显示
    async showEditGoodDia (good) {
      // 显示修改商品对话框
      this.EditGoodDialog = true
      // 获取当前商品id
      this.goodId = good.goods_id
      // 通过id查询对应商品数据
      const res = await this.$http.get(`goods/${this.goodId}`)
      // 将当前商品数据保存在goodform中
      this.goodform = res.data.data
    },
    // 获取商品列表数据
    async getGoodListData () {
      // 请求商品列表数据
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      console.log(res);
      const {
        data,
        meta: {status }
      } = res.data
      if (status === 200) {
        this.goodListData = data.goods
      }
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
</style>
