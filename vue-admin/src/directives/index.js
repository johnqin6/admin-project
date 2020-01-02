import Vue from 'vue'
import EnterNumber from './enterNumber'

const directives = [
  EnterNumber
]

directives.forEach(directive => {
  Vue.directive(directive.name, directive)
})
