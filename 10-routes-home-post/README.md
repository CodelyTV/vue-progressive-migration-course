# Routes version


<small>`Vue.use` → https://vuejs.org/v2/api/#Vue-use</small> 
<small>Plugins → https://vuejs.org/v2/guide/plugins.html</small> 

<small>Getting Started With Vue Router → https://scotch.io/tutorials/getting-started-with-vue-router</small> 


Routes are handled by the library [`vue-router`](https://github.com/vuejs/vue-router)

Routes are defined here...

**`src/router/index.js`**

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home
    }, 
    {
      path: '/post',
      component: Post
    }
  ]
})
```

Here we tell Vue to manage the previously defined routes...

**`src/main.js`**

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './css/main.css'

Vue.config.productionTip = false

new Vue({
  ...App,
  router
}).$mount('#app')

```


And here we use them (where to display the content of the routes and links)...

**`src/App.vue`**

```javascript
<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li>
          <router-link to="/post">Post</router-link>
        </li>
      </ul>
    </nav>
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

```
