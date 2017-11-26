import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import PostList from '@/components/post/PostList'
import NewPost from '@/components/post/NewPost'
import Setting from '@/components/setting/Setting'
import Theme from '@/components/theme/Theme'
import SinglePage from '@/components/single-page/SinglePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/post-list',
          name: 'post-list',
          component: PostList,
        },
        {
          path: '/new',
          name: 'new-post',
          component: NewPost,
        },
        {
          path: '/theme',
          name: 'theme',
          component: Theme,
        },
        {
          path: '/single-page',
          name: 'single-page',
          component: SinglePage,
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting,
        },
        {
          path: '*',
          redirect: '/post-list',
        },
      ],
    },
    {
      path: '*',
      redirect: '/post-list',
    },
  ],
})
