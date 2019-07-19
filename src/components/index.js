// 封装一个VUE的插件,完成当前文件夹所有的组件全局注册
// 当导出这个模块使用Vue.use(使用这个模块)Vue会调用install函数 默认出入vue对象
import MyBread from '@/components/my-bread.vue'
// 频道组件引入
import MyChannel from '@/components/my-channel.vue'
import MyImage from '@/components/my-image.vue'

export default {
  install (Vue) {
    // 使用vue对象去做你的业务即可
    // 进行组件的注册
    //            组件名称     组件配置对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
