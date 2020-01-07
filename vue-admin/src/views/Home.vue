<template>
  <el-container class="home">
    <app-aside></app-aside>
    <div style="width: 100%">
      <app-header></app-header>
      <el-main>
        <router-view/>
        <!-- 抽屉 -->
        <el-drawer
          title="消息中心"
          class="home-drawer"
          :visible.sync="isMessageShow"
          direction="rtl"
          size="360"
          :modal="false"
          :before-close="handleClose">
          <ul>
            <li v-for="(msg,index) in messageList" :key="index">
              <a href="#">{{msg.title}}</a>
              <span>{{msg.time | format('YYYY-MM-DD')}}</span>
            </li>
          </ul>
        </el-drawer>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import appHeader from '../components/layout/appHeader'
import appAside from '../components/layout/appAside'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      messageList: [
        {
          title: '优惠卷到期提醒',
          time: new Date('2019-08-21')
        },
        {
          title: '618大促，请查看活动具体信息',
          time: new Date('2019-06-18')
        },
        {
          title: '充值成功',
          time: new Date('2019-06-15')
        }
      ]
    }
  },
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
  .home-drawer {
    top: 61px;
    ul {
      padding: 0 20px;
      li {
        height: 40px;
        border-bottom: 1px solid #f0f0f0;
        line-height: 40px;
        font-size: 14px;
        span {
          float: right;
        }
      }
    }
  }
}
</style>
<style lang="less">
  .home-drawer {
    .el-drawer__header {
      padding: 10px 20px 10px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 0px;
    }
  }
</style>
