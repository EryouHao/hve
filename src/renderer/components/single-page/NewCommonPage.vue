<template>
  <div class="new-common-page">
    <i-form label-position="top">
      <i-form-item label="标题">
        <i-input v-model="form.title" @on-blur="checkTitle"></i-input>
      </i-form-item>
      <i-form-item label="链接（建议用英文，例如：about）" v-if="showLink">
        <i-input v-model="form.linkName">
          <span slot="prepend">http://xxx.com/</span>
        </i-input>
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
import MarkdownEditor from 'vue-simplemde/src/markdown-editor'

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      form: {
        title: '',
        linkName: '',
        content: '',
      },
      showLink: false,
    }
  },
  methods: {
    checkTitle() {
      if (this.form.title !== '') {
        this.showLink = true
        this.form.linkName = this.form.title
      } else {
        this.showLink = false
        this.form.linkName = ''
      }
    },
    save() {
      console.log(this.form)
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '~simplemde/dist/simplemde.min.css';
  @import '~github-markdown-css';
  .new-common-page {
    padding: 20px;
  }
</style>
