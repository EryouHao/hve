<template>
  <i-button type="primary" long @click="preview">Preview</i-button>
</template>

<script>
// import { shell } from 'electron'
import Build from '@/lib/build'
const build = new Build()

export default {
  data() {
    return {}
  },
  methods: {
    async preview() {
      await build.previewBuild()
      this.$Message.success(`🎉 您的站点已生成预览啦！`)
      // shell.openExternal('http://localhost:4000')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
