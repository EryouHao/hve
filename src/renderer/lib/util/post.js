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
    const html = converter.makeHtml(post.content)
    fs.readFileAsync(`${templatePath}/index.pug`, 'utf8').then((data) => {
      const template = pug.compile(data, {
        filename: 'index.html',
      })
      const htmlStr = template({
        articles: ['post1', 'post2', 'post3'],
        content: html,
      })
      return fs.writeFileAsync(`${outputPath}/${post.fileName}.html`, htmlStr)
    })
      .then(() => console.log('build post success.'))
      .catch(err => console.log(err))
  },
}
