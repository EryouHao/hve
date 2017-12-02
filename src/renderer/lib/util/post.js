const fs = require('fs')
const fse = require('fs-extra')
const pug = require('pug')
const matter = require('gray-matter')
const marked = require('marked')
const moment = require('moment')
moment.locale('zh-cn')

const Promise = require('bluebird')
Promise.promisifyAll(fs)

async function getPostList(postPath) {
  const resultList = []
  const requestList = []
  const files = await fse.readdir(postPath)
  files.forEach((item) => {
    if (item === '.DS_Store') {
      return
    }
    requestList.push(fs.readFileAsync(`${postPath}/${item}`, 'utf8'))
  })
  const results = await Promise.all(requestList)
  results.forEach((result, index) => {
    const post = matter(result)
    // 摘要
    post.abstract = (post.content).substring(0, post.content.indexOf('<!-- more -->'))
    post.fileName = files[index + 1].substring(0, files[index + 1].length - 3) // 有待优化!
    resultList.push(post)
  })
  return Promise.resolve(resultList)
}

async function getPageList(pagePath) {
  const resultList = []
  const requestList = []
  const dirs = await fse.readdir(pagePath)
  dirs.forEach(dir => {
    requestList.push(fs.readFileAsync(`${pagePath}/${dir}/index.md`, 'utf8'))
  })
  const results = await Promise.all(requestList)
  results.forEach((result, index) => {
    const page = matter(result)
    page.linkName = dirs[index]
    resultList.push(page)
  })
  return Promise.resolve(resultList)
}

/**
 * 文章页
 * @param {Object} post
 * @param {Object} config
 */
async function buildPost(post, config) {
  const contentHtml = marked(post.content, { breaks: true })
  const template = pug.compileFile(`${config.templatePath}/post.pug`, {
    filename: 'index.html',
    basedir: config.templatePath,
    pretty: true,
  })
  const postHtml = template({
    domain: config.domain,
    title: post.data.title,
    date: moment(post.data.date).format('MMMM Do YYYY, a'),
    content: contentHtml,
  })
  const html = await buildHtmlWithLayout(config, postHtml)
  await fs.writeFileAsync(`${config.outputPath}/post/${post.fileName}.html`, html)
}

/**
 * 首页 分页
 * @param {Array} postList
 * @param {Object} config
 */
async function buildPostList(postList, config) {
  const template = pug.compileFile(`${config.templatePath}/index.pug`, {
    filename: 'index.html',
    basedir: config.templatePath,
    pretty: true,
  })
  const list = postList.map(post => {
    post.data.date = moment(post.data.date).format('MMMM Do YYYY, a')
    console.log(post.data.tags)
    if (post.data.tags) {
      post.data.tags = post.data.tags.split(' ')
    } else {
      post.data.tags = []
    }
    return post
  })
  const data = {
    domain: config.domain,
    articles: [],
    prevLink: '',
    nextLink: '',
  }
  // 分页
  const perPage = config.pageSize
  for (let i = 0, len = list.length; (i * perPage) < len; i = i + 1) {
    data.articles = list.slice(perPage * i, (i + 1) * perPage)
    if (i === 0) {
      data.prevLink = ''
    } else if (i === 1) {
      data.prevLink = `${config.domain}/`
    } else {
      data.prevLink = `${config.domain}/page/${i}/`
    }
    if (((i + 1) * perPage) >= len) {
      data.nextLink = ''
    } else {
      data.nextLink = `${config.domain}/page/${i + 2}/`
    }
    // 输出
    const postListHtml = template(data)
    const html = await buildHtmlWithLayout(config, postListHtml)
    let outputDir
    if (i === 0) {
      outputDir = `${config.outputPath}`
    } else {
      outputDir = `${config.outputPath}/page/${i + 1}`
    }
    await fse.ensureDir(outputDir)
    console.log('输出目录：', outputDir)
    await fs.writeFileAsync(`${outputDir}/index.html`, html)
    console.log('共生成文章数：', len)
  }
}
/**
 * 单页
 * @param {Array} pages
 * @param {Object} config
 */
async function buildSinglePage(pages, config) {
  for (let page of pages) {
    const contentHtml = marked(page.content, { breaks: true })
    const template = pug.compileFile(`${config.templatePath}/page.pug`, {
      filename: 'index.html',
      basedir: config.templatePath,
      pretty: true,
    })
    const pageHtml = template({
      title: page.data.title,
      content: contentHtml,
    })
    const html = await buildHtmlWithLayout(config, pageHtml)
    console.log('html: ', html)
    fse.ensureDir(`${config.outputPath}/${page.linkName}`)
    await fs.writeFileAsync(`${config.outputPath}/${page.linkName}/index.html`, html)
  }
}

/**
 * 基本继承布局
 * @param {Object} config
 * @param {String} content
 */
async function buildHtmlWithLayout(config, content) {
  const template = pug.compileFile(`${config.templatePath}/layout.pug`, {
    filename: 'index.html',
    basedir: config.templatePath,
    pretty: true,
  })
  console.log('config.website: ', config.website)
  const html = template({
    website: config.website,
    domain: config.domain,
    content: content,
  })
  return html
}

export {
  getPostList,
  buildPost,
  buildPostList,
  buildSinglePage,
  getPageList,
}
