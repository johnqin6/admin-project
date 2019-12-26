<template>
  <div class="login-box">
    <div class="login-register">
      <span class="way" @click="chooseAction('login')" :class="{'active': action === 'login'}">登录</span>
      <span style="width: 20px;">
        <i class="circle"></i>
      </span>
      <span
        class="way"
        @click="chooseAction('register')"
        :class="{'active': action === 'register'}"
      >注册</span>
    </div>
    <!-- S 登录或注册表单 -->
    <el-form ref="form" :model="form" class="logion-form">
      <el-form-item>
        <el-input placeholder="用户名称" v-model="form.userName">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item v-show="action === 'register'">
        <el-input placeholder="手机号或邮箱" v-model="form.email_or_phone">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="密码" :type="pwdType" v-model="form.password">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="forget-password" v-show="action === 'login'">
        <span @click="forgetPwd">忘记密码</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="large-btn" v-show="action === 'login'">登录</el-button>
        <el-button type="primary" class="large-btn" v-show="action === 'register'">注册</el-button>
      </el-form-item>
    </el-form>
    <!-- E 登录或注册表单 -->

    <!-- S 第三方账户登录 -->
    <div class="third-party__login">
      <p class="third-title">社交帐户{{action === 'login' ? '登录' : '注册'}}</p>
      <ul class="third-party-list">
        <li>
          <a href="/users/auth/qq_connect">
            <i class="icon iconfont icon-weixin login-icon wechat"></i>
          </a>
        </li>
        <li>
          <a href="/users/auth/wechat">
            <i class="icon iconfont icon-icon login-icon qq"></i>
          </a>
        </li>
      </ul>
    </div>
    <!-- E 第三方账户登录 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      action: 'login',
      form: {
        userName: '',
        email_or_phone: '',
        password: ''
      },
      pwdType: 'password' // 控制显示或隐藏密码
    }
  },
  methods: {
    // 选择登录或注册
    chooseAction (val) {
      this.action = val
    },
    // 进入忘记密码模块
    forgetPwd () {
      this.$emit('forgetPwd')
    },
    // 是否显示密码
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-box {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 2px 2px 10px #fff;
  overflow: hidden;
  .login-register {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    overflow: hidden;
    span {
      float: left;
      width: 50px;
      height: 40px;
      line-height: 40px;
      &.way {
        cursor: pointer;
        &.active {
          color: #3688b8;
          border-bottom: 2px solid #3688b8;
          box-sizing: border-box;
        }
        &:hover {
          color: #3688b8;
          border-bottom: 2px solid #3688b8;
          box-sizing: border-box;
        }
      }
    }
    .circle {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #999;
      border-radius: 50%;
    }
  }
  .logion-form {
    padding: 30px 20px;
    .forget-password {
      text-align: right;
      height: 20px;
      line-height: 20px;
      margin-top: -20px;
      color: red;
      cursor: pointer;
    }
  }
}
.third-party__login {
  .third-title {
    position: relative;
  }
  .third-title::before,
  .third-title::after {
    content: "";
    position: absolute;
    top: 10px;
    width: 60px;
    height: 1px;
    background-color: #ccc;
  }
  .third-title::before {
    left: 100px;
  }
  .third-title::after {
    right: 100px;
  }
  .third-party-list {
    position: relative;
    left: 50%;
    width: 120px;
    transform: translateX(-50%);
    overflow: hidden;
    li {
      float: left;
      width: 50px;
      height: 50px;
      line-height: 50px;
      a {
        text-decoration: none;
      }
      .login-icon {
        font-size: 28px;
      }
      .wechat {
        color: #00bb29;
      }
      .qq {
        color: #498ad5;
      }
    }
  }
}
</style>
