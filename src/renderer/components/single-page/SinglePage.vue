<template>
  <div class="single-page">
    <h2>单页设置<Button type="primary" class="new-page" icon="android-add">新单页</Button></h2>
    <div class="card-container">
      <i-card>
        <p slot="title">
          <i-icon type="ios-book-outline"></i-icon>
          关于
        </p>
        <Dropdown slot="extra" placement="bottom-end" trigger="click">
            <a href="javascript:void(0)">
                设置
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem disabled>开启</DropdownItem>
              <DropdownItem>关闭</DropdownItem>
              <DropdownItem>删除</DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
      switch1: true,
    }
  },
  methods: {
    change() {},
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
