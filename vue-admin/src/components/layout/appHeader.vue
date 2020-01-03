<template>
  <el-header class="app-header">
    <span class="app-bread">
      <i class="el-icon-s-fold switch-nav-way"
        :class="{'el-icon-s-unfold': opened}"
        @click="switchNavWay"></i>
      <bread-crumb></bread-crumb>
    </span>
    <el-dropdown @command="handleCommand">
      <i class="el-icon-setting" style="margin-right: 15px; font-size: 20px;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
      <span>{{ userInfo.username }}</span>
      <img class="avatar-img" :src="userInfo.avatar" alt="avater" >
    </el-dropdown>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
import breadCrumb from '../BreadCrumb'

export default {
  computed: {
    ...mapGetters(['opened', 'userInfo'])
  },
  methods: {
    switchNavWay () {
      this.$store.commit('app/SET_OPENED', !this.opened)
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      }
    },
    // 登出
    logout () {
      this.$store.commit('user/DEL_TOKEN')
      localStorage.removeItem('token')
      this.$router.replace({
        path: '/login'
      })
    }
  },
  components: {
    breadCrumb
  }
}
</script>
<style lang="less" scoped>
.app-header {
  position: relative;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 0 1px 2px #ccc;
  -webkit-transition: width .3s;
  transition: width .3s;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
  .app-bread {
    position: absolute;
    left: 20px;
    top: 0;
    width: 30%;
    padding-top: 20px;
    .switch-nav-way {
      float: left;
      height: 100%;
      margin-right: 20px;
      margin-top: -2px;
      font-size: 20px;
    }
  }
  .avatar-img {
    position: relative;
    top: 10px;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    border-radius: 50%;
  }
}
</style>
