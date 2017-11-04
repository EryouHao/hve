<template>
  <i-button @click="preview">Preview</i-button>
</template>

<script>
import {shell} from 'electron'
import fse from 'fs-extra'
import Post from '@/lib/util/post'

export default {
  data() {
    return {}
  },
  methods: {
    preview() {
      let posts = null
      this.$db.find({}, (err, docs) => {
        if (err) console.log(err)
        posts = docs
        this.build('dev', posts)
        shell.openExternal('http://localhost:4000')
      })
    },
    async build(env, posts, options) {
      const dir = env === 'dev' ? '.tmp' : 'public'
      const templatePath = '/Users/haoeryou/fed/hve/blog/theme/easy/layout'
      const outputPath = `/Users/haoeryou/fed/hve/${dir}`
      // 渲染文章
      // 创建预览文件夹 .tmp
      await fse.ensureDir(dir)
      await fse.emptyDir(`${outputPath}/post`)
      posts.forEach((post) => {
        Post.buildPost(post, templatePath, outputPath)
      })
      Post.buildPostList(posts, templatePath, outputPath)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
