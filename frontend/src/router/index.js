import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter(to, from, next) {
      if (store.state.passengerId) return next('/dashboard')
      return next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter(to, from, next) {
      if (store.state.passengerId) return next('/dashboard')
      return next()
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.passengerId) return next('/login')
      return next()
    }
  },
  {
    path: '/booking-start',
    name: 'BookingStart',
    component: () => import('../views/BookingStart.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.passengerId) return next('/login')
      return next()
    }
  },
  {
    path: '/booking-end',
    name: 'BookingEnd',
    component: () => import('../views/BookingEnd.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.passengerId) return next('/login')
      return next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
