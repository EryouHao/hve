<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <sidebar></sidebar>
    <div class="right">
      <div class="content">
        <router-view></router-view>
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
import { getPostList } from '@/lib/util/post'

export default {
  components: {
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
    this.$dbConfig.find({}, (err, res) => {
      if (err) throw err
      this.$store.dispatch('updateSetting', res[0])
      this.emptyDb()
      this.getPostList()
    })
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
    async getPostList() {
      const postPath = `${this.$store.state.Setting.source}/posts`
      this.postList = await getPostList(postPath)
      this.$dbPosts.insert(this.postList, (err, ret) => {
        if (err) console.log(err)
        console.log(ret)
      })
      console.log(this.postList)
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