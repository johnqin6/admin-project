<template>
  <el-col :span="6">
    <el-card class="box-card">
      <div class="card-info" >
        <slot name="left"></slot>
      </div>
      <div class="card-icon">
        <slot name="right"></slot>
      </div>
    </el-card>
  </el-col>
</template>
<script>
export default {
  name: 'card-item',
  props: {

  }
}
</script>
<style lang="less" scoped>
.box-card {
  overflow: hidden;
  padding-bottom: 20px;
  .card-info,
  .card-icon {
    float: left;
    text-align: center;
  }
  .card-info {
    width: 70%;
  }
  .card-icon {
    width: 30%;
    i {
      font-size: 55px;
    }
  }
}
</style>
<style lang="less">
  .box-card {
    .card-icon {
      i {
        font-size: 55px;
      }
    }
  }
</style>
