import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'user',
      component: () => import('@/views/User')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/views/Support')
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
