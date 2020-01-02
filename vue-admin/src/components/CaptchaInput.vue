<template>
  <div class="captcha">
    <el-input
      class="captcha-input"
      v-model="verifocateCode"
      placeholder="验证码">
    </el-input>
    <a href="#" @click="editCaptcha">
      <img src="/api/users/getCaptcha" alt="captcha" ref="imgYzm">
    </a>
  </div>
</template>
<script>

export default {
  name: 'CaptchaInput',
  data () {
    return {
      verifocateCode: ''
    }
  },
  watch: {
    verifocateCode (newVal) {
      this.$emit('getCaptch', newVal)
    }
  },
  methods: {
    editCaptcha () {
      this.$refs.imgYzm.src = '/api/users/getCaptcha?d=' + Math.random()
    }
  }
}
</script>
<style lang="less" scoped>
.captcha {
  height: 55px;
  overflow: hidden;
  .captcha-input {
    float: left;
    width: 280px;
  }
  img {
    border: 1px solid #ccc;
  }
}
</style>
