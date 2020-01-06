<template>
  <el-container class="home">
    <app-aside></app-aside>
    <div style="width: 100%">
      <app-header></app-header>
      <el-main>
        <router-view/>
      </el-main>
    </div>
    <!-- 抽屉 -->
    <el-drawer
      title="我是标题"
      :visible.sync="isMessageShow"
      direction="rtl"
      :before-close="handleClose">
      <span>我来啦!</span>
    </el-drawer>
  </el-container>
</template>

<script>
import appHeader from '../components/layout/appHeader'
import appAside from '../components/layout/appAside'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters(['isMessageShow'])
  },
  methods: {
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$store.commit('app/SET_MESSAGESHOW', false)
        })
        .catch(_ => {})
    }
  },
  components: {
    appHeader,
    appAside
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
