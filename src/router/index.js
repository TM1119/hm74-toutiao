// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/welcome/welcome.vue'
import NotFound from '../views/404'
import Article from '../views/article/article.vue'
import Images from '../views/images/images.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: '',
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'images', path: '/images', component: Images }
      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})
// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hm74-toutiao')
  if (user) return next()
  next('/login')
})
export default router
