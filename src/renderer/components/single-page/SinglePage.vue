<template>
  <div class="single-page">
    <h2>
      单页设置
      <i-dropdown
        class="new-page"
        trigger="click"
        placement="bottom-end"
        @on-click="newPage"
      >
        <i-button type="primary" icon="android-add">
          新单页
        </i-button>
        <i-dropdown-menu slot="list">
            <i-dropdown-item name="common">普通页</i-dropdown-item>
            <i-dropdown-item name="custom">自定义</i-dropdown-item>
        </i-dropdown-menu>
      </i-dropdown>
    </h2>
    <div class="card-container">
      <i-card>
        <p slot="title">
          <i-icon type="ios-book-outline"></i-icon>
          关于
        </p>
        <i-dropdown slot="extra" placement="bottom-end" trigger="click">
            <a href="javascript:void(0)">
                设置
                <i-icon type="arrow-down-b"></i-icon>
            </a>
            <i-dropdown-menu slot="list">
              <i-dropdown-item disabled>开启</i-dropdown-item>
              <i-dropdown-item>关闭</i-dropdown-item>
              <i-dropdown-item>删除</i-dropdown-item>
            </i-dropdown-menu>
        </i-dropdown>
        <div>
          这里是预览的内容
        </div>
      </i-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showNewCommonPage: false,
      pageType: '',
    }
  },
  methods: {
    change() {},
    newPage(type) {
      console.log(this.$route)
      this.$router.push(`/new-${type}-page`)
    },
  },
}
</script>

<style lang="scss" scoped>
.single-page {
  padding: 20px;
  .new-page {
    float: right;
  }
}
.card-container {
  padding: 20px 0;
}
</style>
