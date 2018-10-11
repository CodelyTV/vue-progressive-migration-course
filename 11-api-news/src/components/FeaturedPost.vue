<template>
  <div class="card flex-md-row mb-4 shadow-sm h-md-250">
    <div class="featured-post-content card-body d-flex flex-column align-items-start">
      <strong class="d-inline-block mb-2 text-primary">{{ article.author }}</strong>
      <h3 class="mb-0">
        <router-link class="text-dark" :to="{ name: 'PostDetails', params: { id: article.key } }">{{ article.title }}</router-link>
      </h3>
      <div class="mb-1 text-muted">{{ publishedAt }}</div>
    </div>
    <img class="featured-post-image img-fluid" :src="article.urlToImage" alt="Card image cap">
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'FeaturedPost',
  props: {
    article: Object
  },
  computed: {
    linkPost: function() {
      return `/post/${this.article.key}`
    },
    publishedAt: function() {
      return moment(this.article.publishedAt).fromNow()
    }
  }
  
}
</script>