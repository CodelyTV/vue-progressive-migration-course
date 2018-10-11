<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>

import NewsApiService from './services/NewsApiService.js'

const API_KEY = 'ba2a4f83ceda44eaae1ae4d972c14fdb'
const service = new NewsApiService(API_KEY)

const DEFAULT_QUERY='javascript'

export default {
  name: 'App',
  data: function() {
    return {
      articles: []
    }
   },
  created: function () {
    service.getNews(DEFAULT_QUERY)
      .then(this.setArticles)
  },
  methods: {
    setArticles: function(articles) {
        this.articles = articles
      }
  }
}
</script>
