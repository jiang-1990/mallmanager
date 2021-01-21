<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><h3>后台管理系统</h3></el-col>
        <el-col :span="18"
          ><div class="grid-content bg-purple-light middle">
            欢迎使用
          </div></el-col
        >
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSignout()" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
          <!--开启路由模式-->
        <el-menu
            :unique-opened='true'
            :router="true"
        >
            <!--1-->
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户管理</span>
                </template>    
                <el-menu-item index="users">
                    <i class="el-icon-document-copy"></i>
                    <span>用户列表</span>
                </el-menu-item>
            </el-submenu>
            <!--2-->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>权限管理</span>
                </template>    
                <el-menu-item index="role">
                    <i class="el-icon-document-copy"></i>
                    <span>角色列表</span>
                </el-menu-item>
                <el-menu-item index="rights">
                    <i class="el-icon-document-copy"></i>
                    <span>权限列表</span>
                </el-menu-item>
            </el-submenu>
            <!--3-->
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>商品管理</span>
                </template>    
                <el-menu-item index="3-1">
                    <i class="el-icon-document-copy"></i>
                    <span>商品列表</span>
                </el-menu-item>
                <el-menu-item index="3-2">
                    <i class="el-icon-data-analysis"></i>
                    <span>分类参数</span>
                </el-menu-item>
                <el-menu-item index="3-3">
                    <i class="el-icon-c-scale-to-original"></i>
                    <span>商品分类</span>
                </el-menu-item>
            </el-submenu>
            <!--4-->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-folder-checked"></i>
                    <span>订单管理</span>
                </template>    
                <el-menu-item index="4-1">
                    <i class="el-icon-document-copy"></i>
                    <span>订单列表</span>
                </el-menu-item>
            </el-submenu>
            <!--5-->
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-pie-chart"></i>
                    <span>数据统计</span>
                </template>    
                <el-menu-item index="5-1">
                    <i class="el-icon-coin"></i>
                    <span>数据报表</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    //newVue 之前自动触发
    beforeCreate(){
        //获取token
        const token = localStorage.getItem('token')
         //if token 有 > 继续渲染组件
         //console.log(token)
         //token 没有 > 登录
        if(!token){
            this.$router.puch({name:'login'})
        }
    },
    methods:{
        handleSignout(){
            //清除token
            localStorage.clear()
            //提示
            this.$message('退出成功')
            //跳转login组件
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  
}
.main {
  background-color: #e9eef3;
  padding: 10px;
}
/**头部样式 */
.middle {
  text-align: center;
  line-height: 60px;
}
.loginout {
  text-decoration: none;
  line-height: 60px;
  margin-left: 80px;
}
</style>
