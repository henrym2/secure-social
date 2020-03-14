import Vue from 'vue'
import VueRouter from 'vue-router'
import UserFeed from '../views/UserFeed.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/feed',
    name: 'Feed',
    component: UserFeed
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
