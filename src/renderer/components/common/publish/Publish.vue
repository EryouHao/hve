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
import fse from 'fs-extra'
import { buildPost, buildPostList, buildSinglePage } from '@/lib/util/post'
import { renderStylus } from '@/lib/util/theme'

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
      await this.build()
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
          await git.commit(`update from hve: ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`)
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
    async build() {
      const posts = await this.$db
        .get('posts')
        .sortBy('data.date')
        .desc()
        .value()
      const pages = await this.$db
        .get('pages')
        .sortBy('data.index')
        .value()
      const basePath = this.$store.state.setting.source
      const templatePath = `${basePath}/theme/easy/layout`
      const outputPath = `${basePath}/public`
      console.log(this.$store.state)
      const config = {
        website: this.$store.state.website,
        templatePath: templatePath,
        outputPath: outputPath,
        domain: this.$store.state.setting.domain,
        pageSize: this.$store.state.website.pageSize,
      }
      console.log('...config...', config)
      // 渲染文章
      await fse.ensureDir(`${outputPath}/post`)
      await fse.emptyDir(`${outputPath}/post`)
      posts.forEach((post) => {
        buildPost(post, config)
      })
      // 渲染列表页
      buildPostList(posts, config)
      // 渲染单页
      console.log('xuanranshi: ', config)
      buildSinglePage(pages, config)
      // 编译 stylus
      const stylusPath = `${basePath}/theme/easy/source/stylus`
      const cssPath = `${basePath}/public/css`
      await fse.ensureDir(`${outputPath}/css`)
      await fse.emptyDir(`${outputPath}/css`)
      renderStylus(stylusPath, cssPath)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
