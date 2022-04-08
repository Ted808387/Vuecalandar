import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'calandar',
        component: () => import('../views/Calandar.vue')
      },
      {
        path: 'week',
        name: 'calandarweek',
        component: () => import('../views/Calandar_week.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
