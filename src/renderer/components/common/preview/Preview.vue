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
    preview() {
      let posts = null
      this.$dbPosts.find({}).sort({
        'data.date': -1,
      }).exec((err, docs) => {
        if (err) console.log(err)
        posts = docs
        this.build(posts)
        // shell.openExternal('http://localhost:4000')
      })
    },
    async build(posts) {
      const basePath = this.$store.state.Setting.source
      const templatePath = `${basePath}/theme/easy/layout`
      const outputPath = `${basePath}/public`
      const config = {
        templatePath: templatePath,
        outputPath: outputPath,
        domain: this.$store.state.Setting.domain,
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
