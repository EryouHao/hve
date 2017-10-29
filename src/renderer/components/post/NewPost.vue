<template>
  <div class="markdown-con">
    <markdown-editor class="md-editor" preview-class="markdown-body" v-model="content"></markdown-editor>
    <div class="btns">
      <Button type="primary">Save</Button>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from 'vue-simplemde/src/markdown-editor'

export default {
  data() {
    return {
      content: '',
    }
  },
  components: {
    MarkdownEditor,
  },
}
</script>

<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
.markdown-con {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
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
