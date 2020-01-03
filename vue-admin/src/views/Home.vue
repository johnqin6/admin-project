<template>
  <el-container class="home">
    <app-aside></app-aside>
    <div style="width: 100%">
      <app-header></app-header>
      <el-main>
        <router-view/>
      </el-main>
    </div>
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
