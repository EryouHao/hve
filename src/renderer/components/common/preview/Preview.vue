<template>
  <i-button type="primary" long @click="preview">Preview</i-button>
</template>

<script>
// import { shell } from 'electron'
import fse from 'fs-extra'
import { buildPost, buildPostList, buildSinglePage } from '@/lib/util/post'
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
      const pages = await this.$db
        .get('pages')
        .sortBy('data.index')
        .value()
      this.build(posts, pages)
      // shell.openExternal('http://localhost:4000')
    },
    async build(posts, pages) {
      const basePath = this.$store.state.setting.source
      const templatePath = `${basePath}/theme/easy/layout`
      const outputPath = `${basePath}/public`
      console.log(this.$store.state)
      const config = {
        website: this.$store.state.website,
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
      // 渲染列表页
      buildPostList(posts, config)
      // 渲染单页
      buildSinglePage(pages, config)
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
