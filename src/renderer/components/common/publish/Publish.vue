<template>
  <div class="">
    <i-button type="success" long @click="publish">Publish</i-button>
  </div>
</template>

<script>
// import { promiseSpawn } from '@/lib/util/spawn'
// import spawn from 'cross-spawn-promise'
import fs from 'fs'
import pathFn from 'path'
import YAML from 'yamljs'
import simpleGit from 'simple-git/promise'
import moment from 'moment'

// const spawn = promiseSpawn
let git

export default {
  data() {
    return {
      source: '',
      domain: '',
      repo: '',
      deployDir: '',
      name: 'EryouHao',
      email: 'haoeryou@qq.com',
    }
  },
  created() {
  },
  methods: {
    // git(args) {
    //   return spawn('git', args, {
    //     cwd: `${this.source}/public`,
    //     stdio: 'inherit',
    //   })
    // },
    push() {
      fs.readFile('/Users/haoeryou/fed/hve/blog/config.yml', 'utf8', (err, data) => {
        if (err) console.log(err)
        console.log(data)
        const config = YAML.parse(data)
        console.log(config)
        this.git(['status']).then(stdout => {
          console.log('stdout', stdout)
          return this.git(['add', '.'])
        }).then(_ => {
          return this.git(['commit', '-m', 'commit from hve'])
        }).then(_ => {
          return this.git(['push', '-u', 'origin', 'master', '--force'])
        }).catch(err => {
          this.git(['commit', '-m', 'commit from hve'])
          console.log('err', err)
          // first commit
          console.log('first commit')
          this.git(['push', '-u', 'origin', 'master'])
          // this.git(['init'])
          //   .then(_ => {
          //     return this.git(['config', 'user.name', 'EryouHao'])
          //   })
          //   .then(_ => {
          //     return this.git(['config', 'user.email', 'haoeryou@qq.com'])
          //   })
          //   .then(_ => {
          //     return this.git(['add', '.'])
          //   })
          //   .then(_ => {
          //     return this.git(['commit', '-m', 'first commit from hve'])
          //   })
          //   .then(_ => {
          //     return this.git(['remote', 'add', 'origin', 'git@github.com:EryouHao/hve-blog.git'])
          //   })
          //   .then(_ => {
          //     return this.git(['push', '-u', 'origin', 'master'])
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        })
      })
    },
    async publish() {
      // 初始化参数
      const setting = this.$store.state.Setting
      this.source = setting.source
      this.domain = setting.domain
      this.repo = setting.repo
      git = simpleGit(`${this.source}/public`)
      console.log(git)
      this.deployDir = pathFn.join(this.source, '.deploy_git')
      // 判断是否是第一次提交
      const exist = await fs.existsSync(this.deployDir)
      console.log('exist', exist)
      if (exist) {
        this.commonPush()
      } else {
        // this.firstPush()
      }
    },
    async firstPush() {
      console.log('执行了第一次push')
      console.log(this.source)
      try {
        // await fs.mkdir(this.deployDir)
        // await fs.writeFile(pathFn.join(this.deployDir, 'placeholder'), '')
        // console.log('创建placeholder成功')
        // // await this.git(['init'])
        // // await this.git(['config', 'user.name', `${this.name}`])
        // // await this.git(['config', 'user.email', `${this.email}`])
        // // await this.git(['add', '.'])
        // // await this.git(['commit', '-m', 'commit from hve'])
        // // await this.git(['remote', 'add', 'origin', `${this.repo}`])
        // await this.git(['push', '-u', 'origin', 'master', '--force'])
        // console.log('push success')

      } catch (e) {
        console.log(e)
      }
    },
    async commonPush() {
      console.log('run common push')
      const statusSummary = await git.status()
      console.log('statusSummary: ', statusSummary)
      if (statusSummary.modified.length > 0) {
        console.log('have update.')
        try {
          await git.add('./*')
          await git.commit(`update from hve: ${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}`)
          await git.push()
          console.log('push done.')
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log('no update.')
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
