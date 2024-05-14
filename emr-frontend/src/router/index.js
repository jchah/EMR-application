import { createRouter, createWebHistory } from 'vue-router'
import CalenderView from '../views/CalenderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/calendar',
      name: 'calendar',
      component: CalenderView
    }
  ]
})

export default router
