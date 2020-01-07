<template>
  <el-header class="header app-header">
    <span class="app-bread">
      <i class="el-icon-s-fold switch-nav-way"
        :class="{'el-icon-s-unfold': opened}"
        id="domColapse"
        @click="switchNavWay"></i>
      <bread-crumb></bread-crumb>
    </span>
    <div class="header-right">
      <full-screen id="domFullScreen"></full-screen>
      <el-badge is-dot @click.native="toggleMsgShow" id="domMessage"
        class="message-tip-icon">
        <i class="el-icon-message-solid iconFont"></i>
      </el-badge>
      <el-dropdown @command="handleCommand">
        <div id="domPersonal">
          <span>{{ userInfo.username }}</span>
          <img class="avatar-img" :src="userInfo.avatar" alt="avater" >
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
import breadCrumb from '../BreadCrumb'
import fullScreen from '../FullScreen'

export default {
  computed: {
    ...mapGetters(['opened', 'userInfo', 'isMessageShow'])
  },
  methods: {
    // 切换信息框是否显示
    toggleMsgShow () {
      this.$store.commit('app/SET_MESSAGESHOW', !this.isMessageShow)
    },
    // 切换菜单栏是否展开
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
    breadCrumb,
    fullScreen
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
  .message-tip-icon {
    font-size: 25px;
    margin-right: 20px;
  }
}
</style>
<style lang="less">
.message-tip-icon {
  .el-badge__content.is-fixed.is-dot {
    top: 21px;
    right: 11px;
  }
}
</style>
