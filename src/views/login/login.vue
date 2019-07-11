<template>
<div class="login-container">
 <el-card class="login-box">
   <img src="../../assets/images/logo_index.png" alt="">
   <el-input v-model="name" placeholder="手机号"></el-input>
   <el-input v-model="pwd" placeholder="请输入验证码" class="input2"></el-input>
   <el-button class="yzbtn">验证码</el-button>
   <el-button type="primary" class="btn">登录</el-button>
 </el-card>

</div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      pwd: ''
    }
  }
}
</script>

<style lang="less">
.login-container{
  width: 100%;
  height: 100%;
  position: absolute;
  left:0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box{
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
      display: block;
      width: 200px;
      margin: 10px auto;
    }
    input{
      margin-bottom: 20px ;
    }
    .input2{
      width: 200px;
    }
    .yzbtn{
     margin-left: 40px;
    }
    .btn{
      width: 360px;
      margin-left: 0;
    }
  }
}
</style>
