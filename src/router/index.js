import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/CalendarView.vue'),
    children: [
      {
        path: '/',
        name: 'CalendarCenter',
        component: () => import('../views/Calendar.vue')
      },
      {
        path: 'week',
        name: 'CalendarWeek',
        component: () => import('../views/Calendar_week.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
