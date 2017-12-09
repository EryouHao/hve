import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import PostList from '@/components/post/PostList'
import PostNew from '@/components/post/PostNew'
import Setting from '@/components/setting/Setting'
import Theme from '@/components/theme/Theme'
import Page from '@/components/page/Page'
import NewCommonPage from '@/components/single-page/NewCommonPage'
import NewCustomPage from '@/components/single-page/NewCustomPage'

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
          component: PostNew,
        },
        {
          path: '/theme',
          name: 'theme',
          component: Theme,
        },
        {
          path: '/page',
          name: 'page',
          component: Page,
        },
        {
          path: '/new-common-page',
          name: 'new-common-page',
          component: NewCommonPage,
        },
        {
          path: '/new-custom-page',
          name: 'new-custom-page',
          component: NewCustomPage,
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
