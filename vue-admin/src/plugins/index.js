import Vue from 'vue'
import Bus from './bus'

const plugins = [Bus]

plugins.forEach(plugin => Vue.use(plugin))
