<template>
  <div class="">
    <i-button @click="publish">Publish</i-button>
  </div>
</template>

<script>
// import { promiseSpawn } from '@/lib/util/spawn'
import spawn from 'cross-spawn-promise'
import fs from 'fs'
import YAML from 'yamljs'

// const spawn = promiseSpawn
const publishPath = '/Users/haoeryou/fed/hve/public'

export default {
  data() {
    return {}
  },
  methods: {
    git(args) {
      return spawn('git', args, {
        cwd: publishPath,
        stdio: 'inherit',
      })
    },
    publish() {
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
          return this.git(['push', '-u', 'origin', 'master'])
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
  },
}
</script>

<style lang="scss" scoped>

</style>
