// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import moment from 'moment'
// myBread其实是组件选项所在的对象{template:'',data等}
import myBread from '@/components/cuscom/myBread'
// axios用法一
// import axios from 'axios'
// Vue.prototype.$http=axios

// axios 用法二 (自定义插件)
import MyServerHttp from '@/plugins/http.js'
Vue.use(MyServerHttp)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 全局过滤器 处理日期
Vue.filter('fmdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
// 全局自定义组件
/*
//组件选项对象 myBread
{
  template:'',
  data(){return {}},
  props:[]
} */
Vue.component(myBread.name, myBread)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
