<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <Col :span="spanLeft" class="left">
        <Menu active-name="1" width="auto">
          <div class="logo">
            Hve
          </div>
          <MenuItem name="1">
          <Icon type="ios-keypad"></Icon>
          <span class="text">文章</span>
          </MenuItem>
          <MenuItem name="2">
          <span class="text">主题</span>
          </MenuItem>
          <MenuItem name="3">
          <span class="text">配置</span>
          </MenuItem>
        </Menu>
      </Col>
      <Col :span="spanRight" class="right">
        <div class="header">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="content">
          <div class="main">内容区域</div>
        </div>
        <div class="copy">
          2017 &copy; EryouHao
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spanLeft: 5,
      spanRight: 19,
    }
  },
  computed: {
    iconSize() {
      return this.spanLeft === 5 ? 14 : 24
    },
  },
  methods: {
    toggleClick() {
      if (this.spanLeft === 5) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 5
        this.spanRight = 19
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  &.hide-text .text {
    display: none;
  }
  .left {
    background: #fff;
    .logo {
      width: 90%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
      margin: 15px auto;
    }
  }
  .right {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    .header {
      height: 60px;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .1);
    }
    .content {
      flex: 1;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 3px #ccc;
      .main {
        padding: 10px;
      }
    }
    .copy {
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
    }
  }
}
.ivu-col{
  transition: width .2s ease-in-out;
}
</style>