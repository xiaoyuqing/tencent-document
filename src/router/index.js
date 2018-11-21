import Vue from 'vue'
import Router from 'vue-router'
import Document from '@/pages/document'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Document',
      component: Document
    },
    {
      path: '/document',
      name: 'Document',
      component: Document
    },
  ]
})
