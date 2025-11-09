import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FormationDetails from '../views/FormationDetails.vue'
import ConverterView from '../views/ConverterView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/formation/:id',
    name: 'FormationDetails',
    component: FormationDetails,
    props: true
  },
  {
    path: '/converter',
    name: 'Converter',
    component: ConverterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If navigating back/forward, restore saved position
    if (savedPosition) {
      return savedPosition
    }
    // If only query parameters changed (same route), don't scroll
    if (to.path === from.path) {
      return false
    }
    // For new route navigation, scroll to top
    return { top: 0 }
  }
})

export default router
