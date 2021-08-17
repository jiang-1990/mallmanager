<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread class="mybread" level1="商品管理" level2="添加商品"></my-bread>
    <!--提示-->
    <el-alert class="tips" title="添加商品" show-icon center type="success">
    </el-alert>
    <!--步骤条steps-->
    <el-steps class="steps" :active="1 * active" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!--添加商品-->
    <el-form
      abel-position="top"
      label-width="80px"
      :model="form"
      style="margin-top: 10px"
    >
      <el-tabs
        @tab-click="tabChange()"
        class="tabs"
        v-model="active"
        tab-position="left"
      >
        <el-tab-pane name="1" label="基本信息">
          <el-form style="height: 350px; overflow: auto;">
            <el-form-item label="商品名称">
              <el-input
                placeholder="请输入"
                v-model="form.goods_name"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input
                placeholder="请输入"
                v-model="form.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input
                placeholder="请输入"
                v-model="form.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input
                placeholder="请输入"
                v-model="form.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                expandTrigger="hover"
                :options="options"
                v-model="selectedOptions"
                :props="defaultProp"
                clearable
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          <el-form style="height: 350px; overflow: auto;">
            <el-form-item
              :key="i"
              v-for="(item1, i) in arrDyparams"
            >
              <h4>{{item1.attr_name}}</h4>
              <el-checkbox-group v-model="selct_attr_vals">
                <el-checkbox
                  v-for="(item2, i) in item1.attr_vals"
                  :key="i"
                  :label="item2"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane name="3" label="商品属性">
          <el-form label-position="top" label-width="80px" style="height: 350px; overflow: auto;">
            <el-form-item
              :label="item.attr_name"
              v-for="(item, i) in arrStatesDyparams"
              :key="i"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane name="4" label="商品图片">
          <el-form style="height: 350px; overflow: auto;">
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :headers="headers"
                :on-success="handleSuccess"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane name="5" label="商品内容">
          <el-form style="height: 350px; overflow: auto;">
            <el-form-item>
              <el-button @click="addGoods" style="margin-top: 12px" type="primary" plain>添加</el-button>
            </el-form-item>
              <quillEditor v-model="form.goods_introduce" class="editor"></quillEditor>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      labelPosition: "right",
      form: {
        goods_name: "",
        goods_cat: "",//分类列表 以“，”分割
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],//上传的图片临时路径（对象）  
        //value: [],
        attrs: [],//商品参数
      },
      // 级联选择器
      options: [],
      selectedOptions: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态参数的数据
      arrDyparams: [],
      arrStatesDyparams: [], // 商品属性数据
      fileList: [], // 上传图片数据
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      selct_attr_vals:[],
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    //发送添加商品请求
    async addGoods(){
      //处理商品分类数据
      this.form.goods_cat=this.selectedOptions.join(",")
      //处理商品参数
      this.form.attrs=this.selct_attr_vals
      const res=await this.$http.post('goods',this.form)
      this.form={}
      console.log(res)
    },
    handleSuccess(file) {
      // 上传图片成功触发 
      //file.data.tmp_path//图片的临时路径
      this.form.pics.push({pic:file.data.tmp_path})
      console.log(file);
    },
    handleRemove(file) {
      // 删除上传的图片触发
      //file.response.data.tmp_path//图片的临时路径
      //从this.form.pics中移除当前删除的图片
       //获取this.form.pics中当前删除的图片的索引
       const index=this.form.pics.findIndex((item)=>{
         //返回this.form.pics中图片路径与删除图片路径相同的索引
         return item.pic===file.response.data.tmp_path
       })
       //根据索引从this.form.pics中移除当前删除的图片
       this.form.pics.splice(index,1)
      console.log(this.form.pics);
    },
    handlePreview(file) {
      // 点击已经上传的图片时触发
      console.log(file);
    },
    // 点击不同的tab（商品名称/商品重量/商品价格等）时触发该方法
    async tabChange() {
      // 如果点击的是第二个tab，同时三级分类有值
      if (this.active === "2") {
        if (this.selectedOptions.length === 0) {
          this.$message.warning("请选择商品分类");
          return;
        } else {
          // 获取商品参数列表信息
          const id = this.selectedOptions[this.selectedOptions.length - 1];
          const res = await this.$http.get(
            `categories/${id}/attributes?sel=many`
          );
          console.log(res);
          this.arrDyparams = res.data.data;
          // 把this.arrDyparams数组中每个对象的.attr_vals转为数组
          this.arrDyparams.forEach((item) => {
            // item.attr_vals=item.attr_vals.trim().split(",")
            // 解决v-for遍历字符串会报错
            item.attr_vals =
              item.attr_vals.length === 0
                ? []
                : item.attr_vals.trim().split(",");
            this.selct_attr_vals=item.attr_vals;
          });
        }
      } else if (this.active === "3") {
        if (this.selectedOptions.length === 0) {
          this.$message.warning("请选择商品分类");
          return;
        }
        // 获取商品属性信息
        const id = this.selectedOptions[2];
        const res = await this.$http.get(
          `categories/${id}/attributes?sel=only`
        );
        this.arrStatesDyparams = res.data.data;
        // console.log(this.arrStatesDyparams);
      }
    },
    handleChange() {
      // console.log(this.selectedOptions);
    },
    // 获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },
  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
.tips,
.steps,
.tabs {
  margin-top: 20px;
}
.editor{
  height: 200px;
}
</style>
