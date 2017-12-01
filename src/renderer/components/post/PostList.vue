<template>
  <div class="post-list">
    <p
      class="post"
      v-show="!preview"
      v-for="(post, index) in postList"
      @mouseover="hover(index)"
      @mouseout="blur"
    >
      <span @click="showPost(post)">{{ post.data.title }}</span>
      <i-poptip
        v-if="hovered && currentIndex === index"
        confirm
        title="您确认删除吗？"
        placement="left"
        @on-ok="deletePost(post)">
        <i-button
          type="error"
          size="small"
          shape="circle"
          icon="android-delete"
        ></i-button>
      </i-poptip>
      <time v-else>{{ post.data.date | formatDate }}</time>
    </p>
    <post-preview v-if="preview" :post="currentPost"></post-preview>
  </div>
</template>

<script>
import moment from 'moment'
import { getPostList } from '@/lib/util/post'
import fse from 'fs-extra'
import PostPreview from './PostPreview'
import marked from 'marked'

export default {
  components: {
    PostPreview,
  },
  data() {
    return {
      postList: [],
      hovered: false,
      currentIndex: -1,
      preview: false,
      currentPost: null,
    }
  },
  async created() {
    // init posts
    this.$db.defaults({ posts: [] })
    // empty posts
    await this.$db.get('posts').remove().write()
    // read posts
    this.postList = await this.getPostList()
    await this.$db.set('posts', this.postList).write()
    this.queryPosts()
  },
  methods: {
    async queryPosts() {
      this.postList = await this.$db
        .get('posts')
        .sortBy('data.date')
        .desc()
        .value()
    },
    async getPostList() {
      const postPath = `${this.$store.state.setting.source}/posts`
      const postList = await getPostList(postPath)
      return postList
    },
    async deletePost(post) {
      try {
        await this.$db.get('posts')
          .remove(d => d.data.title === post.data.title && d.data.date === post.data.date)
          .write()
        const basePath = this.$store.state.setting.source
        await fse.remove(`${basePath}/posts/${post.fileName}.md`)
        this.postList.splice(this.postList.indexOf(post), 1)
        console.log('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    hover(index) {
      this.currentIndex = index
      this.hovered = true
    },
    blur() {
      this.currentIndex = -1
      this.hovered = false
    },
    showPost(post) {
      post.htmlContent = marked(post.content, { breaks: true })
      this.currentPost = post
      this.preview = true
    },
  },
  filters: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>

<style lang="scss" scoped>
  .post-list {
    padding: 10px;
    font-size: 14px;
    .post {
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      padding: 6px 10px;
      line-height: 24px;
      transition: all 0.3s;
      span {
        cursor: pointer;
      }
      &:hover {
        background: #eee;
      }
    }
  }
</style>
