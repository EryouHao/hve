<template>
  <div class="setting">
    <h2>配置</h2>
    <i-form :model="form" :label-width="80">
      <i-form-item label="源文件目录">
        <i-row>
          <i-col span="16">
            <i-input v-model="form.source" disabled></i-input>
          </i-col>
          <i-col span="8">
            <label for="file-path" class="btn-path">更改目录</label>
            <input id="file-path" style="display: none;" type="file" webkitdirectory @change="updateSource">
          </i-col>
        </i-row>
      </i-form-item>
      <i-form-item label="Domain">
        <i-row>
          <i-col span="16">
            <i-input v-model="form.domain"></i-input>
          </i-col>          
        </i-row>
      </i-form-item>
      <i-form-item label="Repository">
        <i-row>
          <i-col span="16">
            <i-input v-model="form.repo"></i-input>
          </i-col>
        </i-row>
      </i-form-item>
      <i-form-item>
        <i-button type="primary" @click="save">保存</i-button>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        source: null,
        domain: null,
        repo: null,
      },
    }
  },
  created() {
    this.$dbConfig.find({}, (err, res) => {
      if (err) throw err
      console.log(res)
      this.form.source = res[0].source
      this.form.domain = res[0].domain
      this.form.repo = res[0].repo
      this.$store.dispatch('updateSetting', res[0])
      console.log(this.$store.state.Setting)
    })
  },
  methods: {
    ...mapActions({

    }),
    updateSource(e) {
      this.form.source = e.target.files[0].path
    },
    save() {
      const config = {
        source: this.form.source,
        domain: this.form.domain,
        repo: this.form.repo,
      }
      this.$dbConfig.find({}, (err, res) => {
        if (err) throw err
        this.$dbConfig.update({_id: res[0]._id}, { $set: config }, {}, (err, res) => {
          if (err) throw err
          this.$Message.success('update success.')
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
