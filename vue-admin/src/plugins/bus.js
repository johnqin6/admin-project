import Vue from 'vue'
export default {
  install (_vue, options) {
    _vue.prototype.$bus = new Vue()
  }
}
