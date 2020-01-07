<template>
  <div class="index">
    <card-list>
      <card-item
        v-for="(item, index) in cardList" :key="index">
        <template slot="left">
          <h3 class="card-count color-green">{{item.count}}</h3>
          <p class="card-desc">{{item.desc}}</p>
        </template>
        <template slot="right">
          <i :class="`${item.icon} ${item.color}`"></i>
        </template>
      </card-item>
    </card-list>
  </div>
</template>
<script>
import cardList from '../components/card/CardList'
import cardItem from '../components/card/CardItem'
export default {
  data () {
    return {
      cardList: [
        {
          count: 545,
          desc: 'Total Visitors',
          icon: 'el-icon-user',
          color: 'color-green'
        },
        {
          count: 545,
          desc: 'Message',
          icon: 'el-icon-s-comment',
          color: 'color-blue'
        },
        {
          count: 545,
          desc: 'Total Order Placeed',
          icon: 'el-icon-shopping-cart-2',
          color: 'color-red'
        },
        {
          count: 545,
          desc: 'Total Profit',
          icon: 'el-icon-wallet',
          color: 'color-green2'
        }
      ]
    }
  },
  components: {
    cardList,
    cardItem
  }
}
</script>
<style lang="less" scoped>
  .card-count {
    font-size: 20px;
  }
  .card-desc {
    font-size: 16px;
  }
</style>
