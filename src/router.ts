import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const router = createRouter({
  history: createWebHashHistory('/grupper/gruppe3-v26/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('./pages/ProjectPage.vue'),
    },
    {
      path: '/sprints',
      name: 'sprints',
      component: () => import('./pages/SprintsPage.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0 }), 5)
    })
  },
})

export default router
