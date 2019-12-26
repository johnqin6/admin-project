<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="title">VUE 后台管理系统</h2>
      <login-box v-show="pageState === 0" @forgetPwd="forgetPassword"></login-box>
      <forget-password v-show="pageState === 1" @backLogin="backLogin"></forget-password>
    </div>
  </div>
</template>
<script>
import loginBox from '@/components/Login'
import forgetPassword from '@/components/ForgetPassword'

export default {
  data () {
    return {
      pageState: 0
    }
  },
  methods: {
    forgetPassword () {
      this.pageState = 1
    },
    backLogin () {
      this.pageState = 0
    }
  },
  components: {
    loginBox,
    forgetPassword
  }
}
</script>
<style lang="less" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    background: url('../assets/images/loginBg.jpg') no-repeat;
    background-size: 100% 100%;
    .login-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 450px;
      transform: translate(-50%, -50%);
      text-align: center;
      .title {
        margin-bottom: 30px;
        font-size: 30px;
        color: #fff;
      }
    }
  }
</style>
