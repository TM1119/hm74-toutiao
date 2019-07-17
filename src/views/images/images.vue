<template>
<div class="container" v-loading="loading">
  <el-card>
   <div slot="header">
     <my-bread>素材管理</my-bread>
   </div>
   <div style="margin-bottom:20px">
     <!-- 按钮式单选框 -->
      <el-radio-group size="small" @change="search()" v-model="reqParams.collect" >
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
     <!-- 绿色按钮 -->
     <el-button type="success" @click="dialogVisible=true" size="small" style="float:right">添加素材</el-button>
   </div>
   <!-- 图片列表 -->
   <ul class="img-list">
     <li v-for="item in images" :key="item.id">
       <img :src="item.url" alt="">
       <div class="fot" v-if="!reqParams.collect">
         <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
         <span class="el-icon-delete"></span>
       </div>
     </li>
   </ul>
      <el-pagination
          v-if="total > reqParams.per_page"
          background
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
</el-card>
<!-- 素材上传对话框 -->
<el-dialog
  title="添加素材"
  :visible.sync="dialogVisible"
  width="300px">
  <span>
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers='headers'
        :show-file-list="false"
        name="image"
        :on-success="handleSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关闭</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 5
      },
      images: [],
      // 加载数据
      loading: false,
      // 总条数
      total: 0,
      // 添加素材相关数据
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 上传成功
    handleSuccess (res) {
      // 预览2s钟,提示上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 自动关闭对话框,更新列表数据
        this.dialogVisible = false
        this.getImages()
        // 再次打开对话框的时候,预览的时上传按钮.而不是之前的图片
        this.imageUrl = null
      }, 2000)
    },
    // 分页功能
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换全部与收藏
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取素材列表数据
    async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 获取数据成功
      this.images = data.results
      // 设置总条数
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .img-list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    li{
      width: 160px;
      height: 160px;
      border: 1px solid #ddd;
      float: left;
      margin-left:50px;
      margin-bottom: 20px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
      .fot{
        position:absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(0,0,0,0.5);
        color: #ffffff;
        span{
          margin: 0 20px;
          &.red{
            color:red;
          }
        }
      }
    }
  }
</style>
