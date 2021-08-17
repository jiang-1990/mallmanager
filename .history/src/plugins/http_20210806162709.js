import axios from 'axios'
// 插件模块
const MyHttpserver = {} // 声明一个插件对象

// MyHttpserver.install = (Vue) => {
//   axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//   // 4. 添加实例方法，可以传参
//   Vue.prototype.$http = axios
// }
//axios 拦截器
MyHttpserver.install = (Vue) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    // 不是登陆请求时设置请求头
    console.log(config)
    if(config.url!=="login"){
      const token = localStorage.getItem('token')
      config.headers['Authorization'] = token // 设置请求头
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  Vue.prototype.$http = axios
}

export default MyHttpserver
