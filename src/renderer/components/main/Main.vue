<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <Col :span="spanLeft" class="left">
        <Menu active-name="1" width="auto">
          <div class="logo">
            Hve
          </div>
          <MenuItem name="1">
            <Icon type="ios-keypad"></Icon>
            <span class="text">文章</span>
          </MenuItem>
          <MenuItem name="2">
            <span class="text">主题</span>
          </MenuItem>
          <MenuItem name="3">
            <span class="text">配置</span>
          </MenuItem>
        </Menu>
      </Col>
      <Col :span="spanRight" class="right">
        <div class="header">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="content">
          <div class="main">
            <Button @click="getPostList">获取文章列表</Button>
            <Button @click="buildAllPost">Build</Button>
            <Button @click="queryDb">Query DB</Button>
            <Button @click="emptyDb">Empty DB</Button>
            <Button @click="preview">Preview Website</Button>
            <p v-for="post in postList">{{ post.data.title }} {{ post.data.date }}</p>
          </div>
        </div>
        <div class="copy">
          2017 &copy; EryouHao
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import {shell} from 'electron'
import fse from 'fs-extra'
import Post from '@/lib/util/post'
import Theme from '@/lib/util/theme'

export default {
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
      this.$db.insert(this.postList, (err, ret) => {
        if (err) console.log(err)
        console.log('插入成功')
        console.log(ret)
      })
      console.log(this.postList)
    },
    buildAllPost() {
      const templatePath = '/Users/haoeryou/fed/hve/blog/theme/easy/layout'
      const outputPath = '/Users/haoeryou/fed/hve/public'
      const stylusPath = '/Users/haoeryou/fed/hve/blog/theme/easy/source'
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
    queryDb() {
      this.$db.find({}, (err, docs) => {
        if (err) console.log(err)
        console.log(docs)
      })
    },
    emptyDb() {
      this.$db.remove({}, { multi: true }, (err, num) => {
        if (err) console.log(err)
        this.$db.loadDatabase((err) => {
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
  .left {
    background: #fff;
    .logo {
      width: 90%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
      margin: 15px auto;
    }
  }
  .right {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    .header {
      height: 60px;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .1);
    }
    .content {
      flex: 1;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 3px #ccc;
      .main {
        padding: 10px;
      }
    }
    .copy {
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
    }
  }
}
.ivu-col{
  transition: width .2s ease-in-out;
}
</style>