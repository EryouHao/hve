<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <main>
      <system-information></system-information>
      <div class="doc">
        <p>{{ content }}</p>
        <button @click="test">test</button>
        <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  const fs = require('fs')
  const pug = require('pug')
  const matter = require('gray-matter')
  const showdown = require('showdown')
  const converter = new showdown.Converter()

  const Promise = require('bluebird')
  Promise.promisifyAll(fs)

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
      return {
        content: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      test () {
        console.log(this.$electron)
        console.log(this.$db)

        let html = ''
        fs.readFileAsync('/Users/haoeryou/Documents/hve-blog/posts/hello.md', 'utf8')
          .then((data1) => {
            console.log(data1)
            const data = matter(data1)
            html = converter.makeHtml(data.content)
            return fs.readFileAsync('/Users/haoeryou/Documents/hve-blog/theme/easy/index.pug', 'utf8')
          })
          .then((data2) => {
            const template = pug.compile(data2, {
              filename: 'index.html'
            })
            const htmlStr = template({
              articles: ['post1', 'post2', 'post3'],
              content: html
            })
            console.log(htmlStr)
            return fs.writeFileAsync('/Users/haoeryou/fed/hve/public/index.html', htmlStr)
          })
          .then((data3) => {
            console.log('success')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 20px 30px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
