<template>
  <i-button type="primary" long @click="preview">Preview</i-button>
</template>

<script>
// import { shell } from 'electron'
import { previewBuild } from '@/lib/build'

export default {
  data() {
    return {}
  },
  methods: {
    async preview() {
      await previewBuild()
      this.$Message.success(`🎉 您的站点已生成预览啦！`)
      // shell.openExternal('http://localhost:4000')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
