<template>
  <div>
    <el-input v-model="verifocateCode" placeholder="验证码"></el-input>
    <img src="" alt="">
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
  mounted () {
  },
  methods: {}
}
</script>
