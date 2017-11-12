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

async function buildPost(post, config) {
  // 单条文章
  const html = marked(post.content, { breaks: true })
  const templateStr = await fs.readFileAsync(`${config.templatePath}/post.pug`, 'utf8')
  const template = pug.compile(templateStr, {
    filename: 'index.html',
    basedir: config.templatePath,
  })
  const htmlStr = template({
    domain: config.domain,
    title: post.data.title,
    date: moment(post.data.date).format('MMMM Do YYYY, a'),
    content: html,
  })
  console.log('post.fileName: ', post.fileName)
  await fs.writeFileAsync(`${config.outputPath}/post/${post.fileName}.html`, htmlStr)
}

async function buildPostList(postList, config) {
  const templateStr = await fs.readFileAsync(`${config.templatePath}/index.pug`, 'utf8')
  const template = pug.compile(templateStr, {
    filename: 'index.html',
    basedir: config.templatePath,
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
  const htmlStr = template({
    domain: config.domain,
    articles: list,
  })
  console.log(list)
  await fs.writeFileAsync(`${config.outputPath}/index.html`, htmlStr)
}

export {
  getPostList,
  buildPost,
  buildPostList,
}
