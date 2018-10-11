import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home }, 
    { path: '/home', component: Home }, 
    { name:'PostDetails', path: '/post/:id', component: Post }
  ]
})