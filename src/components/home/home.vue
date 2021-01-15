<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><h3>后台管理系统</h3></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light middle">欢迎使用</div></el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple">
                <a class="loginout" href="#">退出</a>
            </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
/**头部样式 */
.middle{
    text-align: center;
    line-height: 60px;
}
.loginout{
    text-decoration: none;
    line-height: 60px;
    margin-left: 80px;
}
</style>
