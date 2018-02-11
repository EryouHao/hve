const fse = require('fs-extra')
const DB = require('../datastore')
const Post = require('./util/post')
console.log(Post)
console.log(Post.post)
// const post = new Post()

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

  const sourcePath = setting.source
  const outputPath = `${sourcePath}/${type === 'preview' ? 'preview' : 'public'}`
  const domain = type === 'preview' ? `${sourcePath}/preview` : setting.domain

  const config = {
    website: website,
    templatePath: `${sourcePath}/theme/easy/layout`,
    outputPath: outputPath,
    domain: domain,
    pageSize: website.pageSize,
  }
  console.log('...config...', config)

  // 渲染文章
  await fse.ensureDir(`${outputPath}/post`)
  await fse.emptyDir(`${outputPath}/post`)
  posts.forEach(post => {
    Post.renderPost(post, config)
  })

  // 渲染列表页
  await Post.renderPostList(posts, config)

  // 渲染单页
  await Post.renderSinglePage(pages, config)

  // 编译 stylus
  const stylusPath = `${sourcePath}/theme/easy/source/stylus`
  const cssPath = `${outputPath}/css`
  await fse.ensureDir(`${outputPath}/css`)
  await fse.emptyDir(`${outputPath}/css`)
  await Theme.renderStylus(stylusPath, cssPath)
}

async function previewBuild() {
  await build('preview')
}

async function publishBuild() {
  await build('publish')
}

export { previewBuild, publishBuild }
