<template>
  <el-container class="home">
    <app-aside></app-aside>
    <el-container>
      <app-header></app-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import appHeader from '../components/layout/appHeader'
import appAside from '../components/layout/appAside'

export default {
  name: 'home',
  mounted () {
  },
  methods: {
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
