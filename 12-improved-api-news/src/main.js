import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AsyncComputed from 'vue-async-computed'

import './css/main.css'

import NewsApiService from './services/NewsApiService'
window.NewsApiService = NewsApiService

Vue.config.productionTip = false
Vue.use(AsyncComputed)

new Vue({
  ...App,
  router
}).$mount('#app')
