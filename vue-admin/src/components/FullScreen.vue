<template>
  <div class="full-screen">
    <i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
  </div>
</template>
<script>
import screenfull from 'screenfull'

export default {
  methods: {
    // 全屏功能
    toggleFull () {
      if (!screenfull.isEnabled) {
        this.$message({
          type: 'warning',
          message: '你的浏览器不能工作'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>
<style lang="less" scoped>
  .full-screen {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    .iconFont {
      font-size: 20px;
    }
  }
</style>
