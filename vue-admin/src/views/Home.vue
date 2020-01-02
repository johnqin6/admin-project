<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      try {
        const res = await this.$http.get('api/users/getUserInfo')
        console.log(res)
      } catch (err) {
        this.$message.error(err.message)
      }
    }
  }
}
</script>
