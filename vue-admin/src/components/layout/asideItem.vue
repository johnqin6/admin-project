<template>
  <div class="side-item" v-if="!item.hidden">
    <template
    v-if="
      hasOnlyChild(item.children, item) &&
      (!childItem.childItem || childItem.noChild)
    ">
      <page-link v-if="childItem.meta" :to="resolvePath(childItem.path)">
        <el-menu-item :index="resolvePath(childItem.path)">
          <i :class="childItem.meta.icon ? childItem.meta.icon : ''"></i>
          <span>{{childItem.meta.title}}</span>
        </el-menu-item>
      </page-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i :class="item.meta.icon ? item.meta.icon : ''"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <side-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :basePath="resolvePath(child.path)"
      ></side-item>
    </el-submenu>
  </div>
</template>
<script>
import pageLink from '../PageLink'
import path from 'path'
import { isAbsolutePath } from '../../utils/validation'

export default {
  name: 'sideItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      childItem: null
    }
  },
  methods: {
    hasOnlyChild (children = [], item) {
      let newChildren = children.filter(obj => !obj.hadden)
      if (newChildren.length === 1 && !item.meta) {
        this.childItem = newChildren[0]
        return true
      }
      if (newChildren.length === 0) {
        this.childItem = { ...item, path: '', noChild: true }
        return true
      }
      return false
    },
    resolvePath (router) {
      if (isAbsolutePath(router.path)) {
        return router
      }
      if (isAbsolutePath(this.basePath)) {
        return this.basePath
      }
      return path.join(this.basePath, router)
    }
  },
  components: {
    pageLink
  }
}
</script>
