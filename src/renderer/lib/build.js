// const fs = require('fs')
const fse = require('fs-extra')
// const path = require('path')
// const chunk = require('chunk')
// const moment = require('moment')
const Post = require('./util/post')

module.exports = {
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
  // build() {
  //   console.log('build')
  // },
}
