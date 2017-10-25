<template>
  <div class="">
    <Button @click="publish">Publish</Button>
  </div>
</template>

<script>
import { promiseSpawn } from '@/lib/util/spawn'
import fs from 'fs'
import YAML from 'yamljs'

const spawn = promiseSpawn
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
        this.git(['init'])
          .then(() => {
            return this.git(['config', 'user.name', 'EryouHao'])
          })
          .then(() => {
            return this.git(['config', 'user.email', 'haoeryou@qq.com'])
          })
          .then(() => {
            return this.git(['add', '.'])
          })
          .then(() => {
            return this.git(['commit', '-m', 'first commit from hve'])
          })
          .then(() => {
            return this.git(['remote', 'add', 'origin', 'git@github.com:EryouHao/hve-blog.git'])
          })
          .then(() => {
            return this.git(['push', '-u', 'origin', 'master'])
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
