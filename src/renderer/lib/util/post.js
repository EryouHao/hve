const fs = require('fs')
const pug = require('pug')
const matter = require('gray-matter')
const marked = require('marked')
const moment = require('moment')
moment.locale('zh-cn')

const Promise = require('bluebird')
Promise.promisifyAll(fs)

const postPath = '/Users/haoeryou/Documents/hve-blog/posts'

module.exports = {
  getPostList() {
    const list = []
    fs.readdir(postPath, (err, files) => {
      if (err) {
        console.log(err)
      }
      console.log(files)
      if (files) {
        files.forEach((item) => {
          if (item === '.DS_Store') {
            return
          }
          fs.readFileAsync(`${postPath}/${item}`, 'utf8').then((data) => {
            const post = matter(data)
            post.fileName = item.substring(0, item.length - 3)
            list.push(post)
          })
        })
      }
    })
    console.log('list', list)
    return list
  },
  buildPost(post, config) {
    // 单条文章
    const html = marked(post.content, { breaks: true })
    fs.readFileAsync(`${config.templatePath}/post.pug`, 'utf8').then((data) => {
      console.log(data)
      const template = pug.compile(data, {
        filename: 'index.html',
        basedir: '/Users/haoeryou/fed/hve/blog/theme/easy/layout',
      })
      console.log(config)
      const htmlStr = template({
        domain: config.domain,
        title: post.data.title,
        date: moment(post.data.date).format('MMMM Do YYYY, a'),
        content: html,
      })
      // console.log(htmlStr)
      return fs.writeFileAsync(`${config.outputPath}/post/${post.fileName}.html`, htmlStr)
    })
      .then(() => console.log('build post success.'))
      .catch(err => console.log(err))
  },
  buildPostList(postList, config) {
    console.log(postList)
    fs.readFileAsync(`${config.templatePath}/index.pug`, 'utf8').then((data) => {
      console.log(data)
      const template = pug.compile(data, {
        filename: 'index.html',
        basedir: '/Users/haoeryou/fed/hve/blog/theme/easy/layout',
      })
      const htmlStr = template({
        domain: config.domain,
        articles: postList,
      })
      return fs.writeFileAsync(`${config.outputPath}/index.html`, htmlStr)
    })
      .then(() => console.log('build post list success.'))
      .catch(err => console.log(err))
  },
}
