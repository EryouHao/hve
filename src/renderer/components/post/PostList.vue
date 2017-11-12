<template>
  <div class="post-list">
    <p class="post" v-for="post in postList">
      {{ post.data.title }}
      <time>{{ post.data.date | formatDate }}</time>
    </p>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      postList: [],
    }
  },
  created() {
    this.queryDb()
  },
  methods: {
    queryDb() {
      this.$dbPosts.find({}).sort({
        'data.date': -1,
      }).exec((err, docs) => {
        if (err) console.log(err)
        this.postList = docs
      })
    },
  },
  filters: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>

<style lang="scss" scoped>
  .post-list {
    padding: 10px;
    font-size: 14px;
    .post {
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      transition: all 0.3s;
      &:hover {
        background: #eee;
      }
    }
  }
</style>
