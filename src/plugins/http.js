import axios from "axios"
//插件模块
    const MyHttpserver = {} //声明一个插件对象
  
    MyHttpserver.install =(Vue)=> {
      axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
      // 4. 添加实例方法，可以传参
      Vue.prototype.$http = axios
    }

    export default MyHttpserver