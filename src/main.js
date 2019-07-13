import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 引入axios
import axios from '@/api/axios.js'
// 基准路径 (不用了)
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   // token认证
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).data.token
// }
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
