import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './css/main.css'

Vue.config.productionTip = false

new Vue({
  ...App,
  router
}).$mount('#app')
