const fse = require('fs-extra')
const DB = require('../datastore')
const Post = require('./util/post')
const Theme = require('./util/theme')

async function build(type) {
  const posts = await DB.db
    .get('posts')
    .sortBy('data.date')
    .desc()
    .value()
  const pages = await DB.db
    .get('pages')
    .sortBy('data.index')
    .value()

  const setting = await DB.db.get('remote').value()
  const website = await DB.site.get('config').value()

  const inputPath = setting.source
  const outputPath = `${inputPath}/${type === 'preview' ? 'preview' : 'public'}`
  const domain = (type === 'preview' ? `${inputPath}/preview` : setting.domain)

  const config = {
    website: website,
    templatePath: `${inputPath}/theme/easy/layout`,
    outputPath: outputPath,
    domain: domain,
    pageSize: website.pageSize,
  }
  console.log('...config...', config)
  // 渲染文章
  await fse.ensureDir(`${outputPath}/post`)
  await fse.emptyDir(`${outputPath}/post`)
  posts.forEach((post) => {
    Post.buildPost(post, config)
  })
  // 渲染列表页
  Post.buildPostList(posts, config)
  // 渲染单页
  Post.buildSinglePage(pages, config)
  // 编译 stylus
  const stylusPath = `${inputPath}/theme/easy/source/stylus`
  const cssPath = `${inputPath}/preview/css`
  await fse.ensureDir(`${outputPath}/css`)
  await fse.emptyDir(`${outputPath}/css`)
  Theme.renderStylus(stylusPath, cssPath)
}

async function previewBuild() {
  await build('preview')
}

async function publishBuild() {
  build('publish')
}

export {
  previewBuild,
  publishBuild,
}
