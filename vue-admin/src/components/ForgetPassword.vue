<template>
  <div class="forget-password">
    <h2>重置密码</h2>
    <el-form ref="form" :model="formData" :rules="rules" class="forget-password__form">
      <el-form-item prop="email_or_phone">
        <el-input class="input-inline-select"
          v-model="formData.email_or_phone"
          :placeholder="accountTypeMemo" >
          <el-select v-model="accountType" slot="prepend" placeholder="请选择验证方式">
            <el-option label="邮箱" :value="1"></el-option>
            <el-option label="手机号" :value="2"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" show-password
          type="password" v-model="formData.password">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input placeholder="再次输入密码" show-password
        type="password" v-model="formData.password2">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <captcha-input @getCaptch="getCaptch"></captcha-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="large-btn" @click="resetPwd">重置密码</el-button>
      </el-form-item>
    </el-form>
    <p @click="backLogin" class="back-login">返回登录页面</p>
  </div>
</template>
<script>
import { isPhone, isEmail } from '../utils/validation'
import captchaInput from './CaptchaInput'

export default {
  name: 'forget-password',
  data () {
    let validateAccount = (rule, value, callback) => {
      if (!isPhone(value) && !isEmail(value)) {
        callback(new Error('请输入正确格式的手机号和密码!'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, val, callback) => {
      if (val !== this.formData.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      accountType: 1,
      accountTypeMemo: '请输入邮箱',
      yzm: '',
      formData: {
        email_or_phone: '',
        password: '',
        password2: ''
      },
      rules: {
        email_or_phone: [
          { required: true, message: '请输入邮箱或手机号', trigger: 'blur' },
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    accountType (newVal) {
      this.accountTypeMemo = this.newVal === 1 ? '请输入邮箱' : '请输入手机号'
      this.formData.email_or_phone = ''
    }
  },
  methods: {
    backLogin () {
      this.$emit('backLogin')
    },
    getCaptch (val) {
      this.yzm = val
    },
    // 重置密码
    resetPwd () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        let captcha = document.cookie.split('=')[1]
        if (!this.yzm) {
          this.$message.warning('请输入验证码！')
          return false
        } else if (this.yzm !== captcha) {
          this.$message.warning('验证码错误！')
          return false
        }
        const params = {
          password: this.formData.password
        }
        if (this.accountType === 1) {
          params.email = this.formData.email_or_phone
        } else {
          params.phone = this.formData.email_or_phone
        }
        const loading = this.$loading({
          lock: true,
          text: '正在重置密码, 请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        })
        this.$http.post('api/users/resetPassword', params)
          .then(res => {
            loading.close()
            this.$message.success(res.message)
            setTimeout(() => {
              this.$emit('backLogin')
            }, 1000)
          }).catch(err => {
            loading.close()
            this.$message.error(err.message)
          })
      })
    }
  },
  components: {
    captchaInput
  }
}
</script>
<style lang="less" scoped>
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
<style>
.input-inline-select .el-select .el-input {
  width: 90px;
}
</style>
