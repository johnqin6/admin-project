<template>
  <div class="page404">
    <p class="page404_p0">Oooops! The Page Not Found :(</p>
    <router-link to="/">
      <el-button>返回首页</el-button>
    </router-link>
  </div>
</template>
<style lang="less" scoped>
.page404 {
  width: 100%;
  height: 100%;
  background: url(../assets/404img/img-404.png) no-repeat center #b5c794;
  text-align: center;
  .page404_p0 {
    font-size: 20px;
    color: #fff;
    text-align: center;
    padding: 80px 0 20px 0;
  }
}
</style>
