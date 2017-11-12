<template>
  <div class="form-container">
    <i-form label-position="top">
      <i-form-item label="标题">
        <i-input v-model="form.title" @on-blur="checkTitle"></i-input>
      </i-form-item>
      <i-form-item label="链接" v-if="showLink">
        <i-input v-model="form.fileName">
          <span slot="prepend">http://xxx.com/post/yyyy-mm-dd/</span>
          <span slot="append">.html</span>
        </i-input>
      </i-form-item>
      <i-form-item label="标签">
        <i-tag
          v-for="(tag, index) in tags"
          :key="index"
          :checked="false"
          checkable
          color="blue"
          @click.native="selectTag(tag)"
        >{{ tag}}</i-tag>
        <i-input
          v-model="newTag"
          placeholder="New Tag"
          size="small"
          style="width: 100px;"
          @on-enter="addTag"
        ></i-input>
      </i-form-item>
      <i-form-item label="内容">
        <div class="markdown-con">
          <markdown-editor class="md-editor" preview-class="markdown-body" v-model="form.content"></markdown-editor>
          <div class="btns">
            <i-button type="primary" @click="save">Save</i-button>
          </div>
        </div>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
import fs from 'fs'
import moment from 'moment'
import matter from 'gray-matter'
import MarkdownEditor from 'vue-simplemde/src/markdown-editor'

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      form: {
        title: '',
        date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        tags: [],
        content: '',
        fileName: '',
      },
      newTag: '',
      tags: [],
      showLink: false,
    }
  },
  mounted() {
    this.initTags()
  },
  methods: {
    async save() {
      const mdStr = `---
title: ${this.form.title}
date: ${this.form.date}
tags: ${this.form.tags.join(' ')}
---
${this.form.content}
`
      console.log(mdStr)
      const basePath = this.$store.state.Setting.source
      console.log(this.$store.state)
      console.log('mdStr: ', mdStr)
      try {
        console.log('this.form.fileName', this.form.fileName)
        await fs.writeFile(`${basePath}/posts/${this.form.fileName}.md`, mdStr)
        const post = matter(mdStr)
        post.fileName = this.form.fileName // 更新DB时添加fileName字段
        await this.$dbPosts.insert(post)
        this.$Message.success('Post is saved!')
        console.log('save success.')
      } catch (e) {
        console.log(e)
      }
    },
    addTag() {
      this.tags.push(this.newTag)
      this.$store.dispatch('addTag', this.newTag)
      this.newTag = ''
    },
    selectTag(tag) {
      if (!this.form.tags.includes(tag)) {
        this.form.tags.push(tag)
      } else {
        const index = this.form.tags.indexOf(tag)
        this.form.tags.splice(index, 1)
      }
    },
    initTags() {
      this.$dbPosts.find({}, (err, res) => {
        if (err) throw err
        let tags = []
        res.forEach((item) => {
          if (item.data.tags && item.data.tags !== '') {
            tags = tags.concat(item.data.tags.split(' '))
          }
        })
        tags = Array.from(new Set(tags))
        this.$store.dispatch('updateTags', tags)
        this.tags = this.$store.state.Tags.tags.slice()
      })
    },
    checkTitle() {
      if (this.form.title !== '') {
        this.showLink = true
        this.form.fileName = this.form.title
      } else {
        this.showLink = false
        this.form.fileName = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';

.form-container {
  padding: 20px;
}
.markdown-con {
  display: flex;
  flex-direction: column;
  flex: 1;
  .md-editor {
    display: flex;
    flex-direction: column;
    flex: 1;
    .CodeMirror {
      flex: 1;
    }
  }
}
.markdown-editor .CodeMirror, .markdown-editor .CodeMirror-scroll {
  min-height: 0;
  flex: 1 !important;
}
.markdown-editor .CodeMirror {
  flex: 1;
}
.ivu-tag:not(.ivu-tag-border):not(.ivu-tag-dot):not(.ivu-tag-checked) {
  background: #eee;
}
</style>
