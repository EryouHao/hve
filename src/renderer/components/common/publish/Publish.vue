<template>
  <div class="">
    <i-button
      type="success"
      long
      :loading="loading"
      @click="publish"
    >Publish</i-button>
  </div>
</template>

<script>
// import { promiseSpawn } from '@/lib/util/spawn'
// import spawn from 'cross-spawn-promise'
import fs from 'fs'
import simpleGit from 'simple-git/promise'
import moment from 'moment'

// const spawn = promiseSpawn
let git

export default {
  data() {
    return {
      setting: null,
      loading: false,
    }
  },
  created() {
  },
  methods: {
    async publish() {
      this.loading = true
      // 初始化参数
      this.setting = this.$store.state.setting
      git = simpleGit(`${this.setting.source}/public`)
      // 判断是否存在本地 git 仓库
      const exist = await fs.existsSync(`${this.setting.source}/public/.git/`)
      if (exist) {
        this.commonPush()
      } else {
        this.firstPush()
      }
    },
    async firstPush() {
      console.log('first push')
      try {
        await git.init()
        await git.addConfig('user.name', `${this.setting.username}`)
        await git.addConfig('user.email', `${this.setting.email}`)
        await git.add('./*')
        await git.commit('first commit!')
        await git.addRemote('origin', `https://${this.setting.username}:${this.setting.token}@github.com/${this.setting.username}/${this.setting.repo}.git`)
        await git.push('origin', `${this.setting.branch}`, {'--force': true}) // 强制推送
        this.loading = false
        this.$Message.success('Your first publish success! Congratulations!')
      } catch (e) {
        this.loading = false
        this.$Message.error(`Error: ${e}`)
      }
    },
    async commonPush() {
      console.log('common push')
      const statusSummary = await git.status()
      if (statusSummary.modified.length > 0) {
        try {
          await git.add('./*')
          await git.commit(`update from hve: ${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}`)
          await git.push('origin', `${this.setting.branch}`)
          this.loading = false
          this.$Message.success('Publish done!')
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      } else {
        this.loading = false
        this.$Message.warning('Your blog is not updated.')
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
