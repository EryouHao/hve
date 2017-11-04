<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <sidebar></sidebar>
    <div class="right">
      <div class="content">
        <router-view></router-view>
        <!-- <post-list></post-list> -->
      </div>
      <div class="copy">
        2017 &copy; EryouHao
      </div>
      <div class="new-post">
        <router-link to="/new">
          <i-button type="primary" shape="circle" icon="plus-round" size="large"></i-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/common/Sidebar'
import PostList from '@/components/post/PostList'
import {shell} from 'electron'
import fse from 'fs-extra'
import Post from '@/lib/util/post'
import Theme from '@/lib/util/theme'
import Publish from '../publish/Publish'
import Preview from '@/components/common/preview/Preview'

export default {
  components: {
    Publish,
    Preview,
    Sidebar,
    PostList,
  },
  data() {
    return {
      spanLeft: 5,
      spanRight: 19,
      postList: [],
    }
  },
  computed: {
    iconSize() {
      return this.spanLeft === 5 ? 14 : 24
    },
  },
  created() {
    this.emptyDb()
    this.getPostList()
  },
  methods: {
    toggleClick() {
      if (this.spanLeft === 5) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 5
        this.spanRight = 19
      }
    },
    getPostList() {
      this.postList = Post.getPostList()
      this.$dbPosts.insert(this.postList, (err, ret) => {
        if (err) console.log(err)
        console.log('插入成功')
        console.log(ret)
      })
      console.log(this.postList)
    },
    buildAllPost() {
      const templatePath = '/Users/haoeryou/fed/hve/blog/theme/easy/layout'
      const outputPath = '/Users/haoeryou/fed/hve/public'
      const stylusPath = '/Users/haoeryou/fed/hve/blog/theme/easy/source/stylus'
      const cssPath = '/Users/haoeryou/fed/hve/public/css'
      fse.emptyDir(`${outputPath}/post`)
        .then(() => {
          console.log('empty dir success!')
          // build post list
          Post.buildPostList(this.postList, templatePath, outputPath)
          // build single post
          this.postList.forEach((post) => {
            Post.buildPost(post, templatePath, outputPath)
          })
          // build theme TODO: 提出去
          Theme.renderStylus(stylusPath, cssPath)
        })
        .catch(err => console.log(err))
    },
    emptyDb() {
      this.$dbPosts.remove({}, { multi: true }, (err, num) => {
        if (err) console.log(err)
        this.$dbPosts.loadDatabase((err) => {
          if (err) console.log(err)
          // done
          console.log('remove success', num)
        })
      })
    },
    preview() {
      shell.openExternal('http://localhost:4000')
    },
  },
}
</script>
<style lang="scss" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  &.hide-text .text {
    display: none;
  }
  .right {
    min-height: 100vh;
    padding-left: 160px;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 3px #ccc;
    }
    .copy {
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
    }
    .new-post {
      position: fixed;
      right: 20px;
      bottom: 10px;
    }
  }
}
</style>