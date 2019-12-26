<template>
  <div class="forget-password">
    <h2>手机号重置密码</h2>
    <el-form ref="form" :model="form" class="forget-password__form">
      <el-form-item>
        <el-input placeholder="手机号" v-model="form.phone">
          <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="密码" type="password" v-model="form.password">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="再次输入密码" type="password" v-model="form.password2">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="large-btn">重置密码</el-button>
      </el-form-item>
    </el-form>
    <p @click="backLogin" class="back-login">返回登录页面</p>
  </div>
</template>
<script>
export default {
  name: 'forget-password',
  data () {
    return {
      form: {
        phone: '',
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    backLogin () {
      this.$emit('backLogin')
    }
  }
}
</script>
<style lang="less">
  .forget-password {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 2px 2px 10px #fff;
    overflow: hidden;
    h2 {
      height: 50px;
      line-height: 50px;
    }
    .back-login {
      cursor: pointer;
    }
  }
</style>
