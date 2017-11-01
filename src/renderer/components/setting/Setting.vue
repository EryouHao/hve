<template>
  <div class="setting">
    <h2>Setting</h2>
    <Form :model="settingForm" :label-width="80">
      <FormItem label="源文件目录">
        <Row>
          <Col span="16">
            <Input v-model="settingForm.sourcePath" disabled></Input>
          </Col>
          <Col span="8">
            <label for="file-path" class="btn-path">更改目录</label>
            <input id="file-path" style="display: none;" type="file" webkitdirectory @change="updatePath">
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settingForm: {
        sourcePath: null,
      },
    }
  },
  created() {
    this.$dbConfig.find({}, (err, res) => {
      if (err) throw err
      console.log(res)
      this.settingForm.sourcePath = res[0].sourcePath
    })
  },
  methods: {
    updatePath(e) {
      console.log(e.target.files[0].path) // '/Users/haoeryou/Documents/hve-blog'
      console.log(e.target.files[0].webkitRelativePath) // 'Documents/hve-blog'
      this.settingForm.sourcePath = e.target.files[0].path
      this.$dbConfig.find({}, (err, res) => {
        if (err) throw err
        console.log(res[0]._id)
        this.$dbConfig.update({_id: res[0]._id}, { $set: {sourcePath: this.settingForm.sourcePath} }, {}, (err, res) => {
          if (err) throw err
          console.log('update success.')
          console.log(res)
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .setting {
    padding: 20px;
  }
  .btn-path {
    margin-left: 20px;
    display: inline-block;
    border: 1px solid #dddee1;
    border-radius: 4px;
    line-height: 1.5;
    white-space: nowrap;
    padding: 6px 15px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition: color .2s linear,background-color .2s linear,border .2s linear;
    &:hover {
      color: #57a3f3;
      border-color: #57a3f3;
    }
  }
</style>
