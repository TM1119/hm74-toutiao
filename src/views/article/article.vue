<template>
  <div class="article-container">
  <!-- 筛选区域 -->
  <el-card>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <!-- 筛选表单 -->
    <el-form :model="reqParams" size="small" label-width="80px">
      <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全选</el-radio>
          <el-radio :label="6">草稿</el-radio>
          <el-radio :label="9">待审核</el-radio>
          <el-radio :label="9">审核通过</el-radio>
          <el-radio :label="9">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道:">
         <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in  channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="日期">
         <el-date-picker
      v-model="dateValues"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 结果区域 -->
  <el-card></el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dateValues: []
    }
  }
}
</script>

<style lang="less">
  .el-card{
   margin-bottom: 20px;
  }
</style>
