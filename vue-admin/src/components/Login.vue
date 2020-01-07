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
    <el-form ref="form" :model="form" status-icon :rules="rules" class="logion-form">
      <el-form-item prop="userName">
        <el-input placeholder="用户名称" v-model="form.userName">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item v-if="action === 'register'" prop="email_or_phone">
        <el-input placeholder="手机号或邮箱" v-model="form.email_or_phone">
          <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" :type="pwdType" v-model="form.password">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="forget-password" v-show="action === 'login'">
        <span @click="forgetPwd">忘记密码</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="large-btn"
        @click="login('form')"
        v-show="action === 'login'">登录</el-button>
        <el-button type="primary" class="large-btn"
        @click="register('form')"
        v-show="action === 'register'">注册</el-button>
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
    <!-- 滑动验证 -->
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify
            @success="onSuccess"
            @fail="onFail"
            :sliderText="text"
            :w="350"
            :h="175"
            ref="slideDiv"
          ></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i
            ><i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { isPhone, isEmail } from '../utils/validation'
import slideVerify from './SlideVerify'

export default {
  data () {
    let validateAccount = (rule, value, callback) => {
      if (!isPhone(value) && !isEmail(value)) {
        callback(new Error('请输入正确格式的手机号和密码!'))
      } else {
        callback()
      }
    }
    return {
      action: 'login',
      text: '向右滑动',
      showSlide: false,
      form: {
        userName: '',
        email_or_phone: '',
        password: ''
      },
      rules: { // 验证规则
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
        ],
        email_or_phone: [
          { required: true, message: '请输入邮箱或手机号', trigger: 'blur' },
          { validator: validateAccount, trigger: 'blur' }
        ]
      },
      notifyObj: null,
      pwdType: 'password' // 控制显示或隐藏密码
    }
  },
  mounted () {
    this.showTip()
  },
  methods: {
    onSuccess () {
      this.showSlide = false
      this.sendLogin()
    },
    onFail () {
      this.$message.error('验证失败')
    },
    refresh () {
      this.$refs.slideDiv.reset()
    },
    async sendLogin () {
      const params = {
        userName: this.form.userName,
        password: this.form.password
      }
      const loading = this.$loading({
        lock: true,
        text: '正在登录, 请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      try {
        const res = await this.$http.post('/api/users/login', params)
        loading.close()
        this.$message.success('登录成功！')
        this.notifyObj.close()
        this.$store.commit('user/SET_TOKEN', res.token)
        await this.getUserInfo()
        this.$router.push({
          path: '/'
        })
      } catch (err) {
        loading.close()
        this.$message.error(err.message)
      }
    },
    // 登录
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.showSlide = true
      })
    },
    async getUserInfo () {
      try {
        const res = await this.$http.get('api/users/getUserInfo')
        this.$store.commit('user/SET_USERINFO', res.data)
      } catch (err) {
        this.$message.error(err.message)
      }
    },
    register (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$http.post('/api/users/register', this.form).then(res => {
          if (res.error === 0) {
            setTimeout(() => {
              this.$message.success('注册成功！')
              this.action = 'login'
            }, 2000)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      })
    },
    // 选择登录或注册
    chooseAction (val) {
      this.action = val
      this.notifyObj.close()
    },
    // 显示提示框
    showTip () {
      this.notifyObj = this.$notify({
        title: '提示',
        message: '目前有两个用户身份，管理员和普通用户',
        duration: 0,
        iconClass: 'el-icon-s-opportunity',
        customClass: 'login-opportunity'
      })
    },
    // 进入忘记密码模块
    forgetPwd () {
      this.$emit('forgetPwd')
      this.notifyObj.close()
    },
    // 是否显示密码
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    }
  },
  components: {
    slideVerify
  }
}
</script>
<style lang="less" scoped>
.login-box {
  position: relative;
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
.slideShadow {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.6);
}
.slideSty {
  position: absolute;
  width: 380px;
  height: 311px;
  background: #e8e8e8;
  border: 1px solid #dcdcdc;
  left: 50%;
  top: 50%;
  margin-left: -188px;
  margin-top: -176px;
  z-index: 99;
  border-radius: 5px;
}
.iconBtn {
  padding: 9px 0 0 19px;
  color: #5f5f5f;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  i:last-child {
    margin-left: 7px;
  }
}
</style>
<style>
.el-notification__icon {
  color: #ffc107;
}

.slideSty .slide-verify {
  margin: 13px auto 0 auto;
  width: 350px !important;
}
.slideSty .slide-verify-slider {
  width: 100% !important;
}
.slideSty .slide-verify-refresh-icon {
  display: none;
}
</style>
