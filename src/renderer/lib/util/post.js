const fs = require('fs')
const pug = require('pug')
const matter = require('gray-matter')
const showdown = require('showdown')
const converter = new showdown.Converter()

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
  buildPost(post, templatePath, outputPath) {
    // 单条文章
    const html = converter.makeHtml(post.content)
    fs.readFileAsync(`${templatePath}/post.pug`, 'utf8').then((data) => {
      // console.log(data)
      const template = pug.compile(data, {
        filename: 'index.html',
        basedir: '/Users/haoeryou/fed/hve/blog/theme/easy',
      })
      const htmlStr = template({
        articles: ['post1', 'post2', 'post3'],
        content: html,
      })
      // console.log(htmlStr)
      return fs.writeFileAsync(`${outputPath}/post/${post.fileName}.html`, htmlStr)
    })
      .then(() => console.log('build post success.'))
      .catch(err => console.log(err))
  },
  buildPostList(postList, templatePath, outputPath) {
    console.log(postList)
    fs.readFileAsync(`${templatePath}/index.pug`, 'utf8').then((data) => {
      console.log(data)
      const template = pug.compile(data, {
        filename: 'index.html',
        basedir: '/Users/haoeryou/fed/hve/blog/theme/easy',
      })
      const htmlStr = template({
        articles: postList,
      })
      return fs.writeFileAsync(`${outputPath}/index.html`, htmlStr)
    })
      .then(() => console.log('build post list success.'))
      .catch(err => console.log(err))
  },
}
