// 配置axios
import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  // 配置对象  基准路径 头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
  // headers: { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token }
})
// 请求拦截
instance.interceptors.request.use((config) => {
  const user = window.sessionStorage.getItem('hm74-toutiao')
  // 给头部添加认证信息
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use((response) => {
  return response
},
(error) => {
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
