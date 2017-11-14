<template>
  <div class="theme">
    <h2>网站设置</h2>
    <div>
      <i-form :model="form" :label-width="80">
        <i-form-item label="网站标题">
          <i-input v-model="form.title" placeholder="Hve"></i-input>
        </i-form-item>
        <i-form-item label="每页文章数">
          <i-input-number :min="1" v-model="form.pageSize"></i-input-number>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="save">保存</i-button>
        </i-form-item>
      </i-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        pageSize: 5,
      },
    }
  },
  methods: {
    async save() {
      await this.$dbWeb.insert(this.form)
      this.$store.dispatch('updateWebSetting', this.form)
      this.$Message.success('网站设置已保存')
      console.log('saved')
    },
  },
}
</script>

<style lang="scss" scoped>
.theme {
  padding: 20px;
}
</style>
