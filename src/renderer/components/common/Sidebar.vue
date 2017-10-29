<template>
  <div class="left">
    <div class="logo">
      Hve
      <p>A static blog build tool.</p>
    </div>
    <Menu active-name="1" width="160px" @on-select="changeMenu">
      <MenuItem name="post-list">
        <span class="text">文章</span>
      </MenuItem>
      <MenuItem name="theme">
        <span class="text">主题</span>
      </MenuItem>
      <MenuItem name="setting">
        <span class="text">配置</span>
      </MenuItem>
    </Menu>
    <div class="btns">
      <Button type="primary" long>Preview</Button>
      <br><br>
      <Button type="success" long>Publish</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    changeMenu(active) {
      this.$router.push({
        name: active,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.ivu-menu-item {
  padding: 10px 24px;
}
.left {
  width: 160px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  border-right: 1px solid #dddee1;
  .logo {
    width: 90%;
    min-height: 60px;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    margin: 15px auto;
    p {
      font-size: 12px;
    }
  }
  .btns {
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 20px;
    left: 0;
  }
}
</style>