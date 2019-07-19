<template>
  <div class='image-container'>
    <!-- 图片按钮 -->
     <div class="img-btn" @click="openDialog">
            <img :src="value||dafaultImage" alt="">
          </div>
    <!-- 对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="700px">
      <!-- 选项卡 -->
       <el-tabs v-model="activeName" type="card" >
          <el-tab-pane label="素材库" name="image">
            <!-- 单选框 -->
            <div style="margin-bottom:10px">
              <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
                  <el-radio-button :label="false">全部</el-radio-button>
                  <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
            </div>

              <!-- 图片列表 -->
              <div class="img-item "
              :class="{selected:selectedImageUrl=== item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id">
                <img :src="item.url" alt="">
              </div>
              <!-- 分页 -->
              <el-pagination
                v-if="total>reqParams.per_page"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="pager"
                >
              </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
            <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :headers="headers"
                :show-file-list="false"
                name="image"
                :on-success="handleSuccess">
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

          </el-tab-pane>
        </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 主动导入的图片资源
import dafaultImage from '../assets/images/pic_bg.png'
export default {
  name: 'my-image',

  data () {
    return {
      // 头部数据
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      },
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8

      },
      // 上传图片后预览的地址
      uploadImageUrl: null,
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 你选中的素材地址
      selectedImageUrl: null,
      // 你选中的图片 默认是图片
      // 注意:webpack不会去打包在数据中定义的地址数据资源,打包标签上的src或url的资源
      // 本地的资源不会去打包,如果是网路资源就没关系
      // 自己主动导入 你需要的图片资源
      // value: dafaultImage
      dafaultImage
    }
  },
  props: ['value'],
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // 如果是素材使用selectedImageUrl作为封面
        // 如果没没有选择图片
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 如果是上传图片 使用 uploadImageUrl 作为封面
        // 如果没有上传图片
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功的函数
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 图片按钮
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    // 获取后台素材数据
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 单选框
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }

}
</script>

<style scoped lang='less'>
.image-container{
  display: inline-block;
  margin-right: 20px;
}
.img-item{
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected{
    &::before{
      content: "";
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
    }
  }
  img{
    width: 100%;
    height: 100%;
    display: block;
    // 图片填充的规则 等比例缩放
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
