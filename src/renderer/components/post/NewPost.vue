<template>
  <div class="form-container">
    <i-form label-position="top">
      <i-form-item label="Title">
        <i-input v-model="form.title"></i-input>
      </i-form-item>
      <i-form-item label="Content">
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
        content: '',
      },
    }
  },
  methods: {
    async save() {
      const mdStr = `---
title: ${this.form.title}
date: ${this.form.date}
---
${this.form.content}
`
      console.log(mdStr)
      const basePath = this.$store.state.Setting.source
      console.log(this.$store.state)
      console.log('mdStr: ', mdStr)
      try {
        await fs.writeFile(`${basePath}/posts/hello-hve.md`, mdStr)
        await this.$dbPosts.insert(matter(mdStr))
        console.log('save success.')
      } catch (e) {
        console.log(e)
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
</style>
