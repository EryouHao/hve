<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <sidebar></sidebar>
    <div class="right">
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="copy">
        2017 &copy; EryouHao
      </div>
      <div class="new-post">
        <router-link to="/new">
          <i-button type="primary" shape="circle" icon="plus-round" size="large"></i-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { setting, website } from '@/store/types'
import Sidebar from '@/components/common/Sidebar'

export default {
  components: {
    Sidebar,
  },
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
  async mounted() {
    // remote setting
    const config = this.$db.get('remote').value()
    this.acUpdateSetting(config)
    // website setting
    const siteConfig = this.$site.get('config').value()
    console.log('siteConfig: ', siteConfig)
    this.acUpdateWebsiteSetting(siteConfig)
  },
  methods: {
    ...mapActions({
      acUpdateSetting: setting.actions.UPDATE_SETTING,
      acUpdateWebsiteSetting: website.actions.UPDATE_SETTING,
    }),
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
  .right {
    min-height: 100vh;
    padding-left: 160px;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 3px #ccc;
    }
    .copy {
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
    }
    .new-post {
      position: fixed;
      right: 20px;
      bottom: 10px;
    }
  }
}
</style>