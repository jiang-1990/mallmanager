<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
    <h3>登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button 
      @click.prevent="handleLogin()"
      class="login-btn" type="primary">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  methods:{
    //登录请求
    handleLogin(){
      this.$http.post('login',this.formdata).then(res=>{
        //console.log(res)
        const {
          data,meta:{
            msg,status
          }
        } = res.data//对象结果赋值
        if(status===200){
          //登录成功
          //跳转home
          this.$router.push({name:'home'})
          //返回信息：登录成功
          this.$message(msg);
        }else{
          //登录失败
          //返回提示信息：登录失败
          this.$message.error(msg);
        }
      })
    }
  }
};
</script>

<style scoped>
  .login-wrap{
    height: 100%;
    background-color: #343273;
    /*弹性盒布局 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form{
    width: 400px;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
  }
  .login-wrap .login-form h3{
    text-align: center;
  }
  .login-wrap .login-btn{
    width: 100%;
  }
</style>
