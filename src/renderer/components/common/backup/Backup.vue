<template>
  <i-button long @click="backup">Backup</i-button>
</template>

<script>
// import fse from 'fs-extra'

export default {
  data() {
    return {}
  },
  methods: {
    backup() {
      console.log('backup')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
