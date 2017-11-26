<template>
  <i-button type="primary" long @click="preview">Preview</i-button>
</template>

<script>
// import { shell } from 'electron'
import fse from 'fs-extra'
import { buildPost, buildPostList } from '@/lib/util/post'
import { renderStylus } from '@/lib/util/theme'

export default {
  data() {
    return {}
  },
  methods: {
    async preview() {
      const posts = await this.$db
        .get('posts')
        .sortBy('data.date')
        .desc()
        .value()
      this.build(posts)
      // shell.openExternal('http://localhost:4000')
    },
    async build(posts) {
      const basePath = this.$store.state.setting.source
      const templatePath = `${basePath}/theme/easy/layout`
      const outputPath = `${basePath}/public`
      console.log(this.$store.state)
      const config = {
        title: this.$store.state.website.title,
        templatePath: templatePath,
        outputPath: outputPath,
        domain: this.$store.state.setting.domain,
        pageSize: this.$store.state.website.pageSize,
      }
      // 渲染文章
      await fse.ensureDir(`${outputPath}/post`)
      await fse.emptyDir(`${outputPath}/post`)
      posts.forEach((post) => {
        buildPost(post, config)
      })
      buildPostList(posts, config)
      // 编译 stylus
      const stylusPath = `${basePath}/theme/easy/source/stylus`
      const cssPath = `${basePath}/public/css`
      await fse.ensureDir(`${outputPath}/css`)
      await fse.emptyDir(`${outputPath}/css`)
      renderStylus(stylusPath, cssPath)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
