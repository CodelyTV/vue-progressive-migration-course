<template>
  <div>
    <div class="container">

      <Header />
      <!-- <LongFeatured /> -->

      <div class="row mb-2" v-if="articles">
        <div 
          v-for="id in keys" 
          :key="id" 
          class="col-md-6"
        > 
          <FeaturedPost :id="id" :article="articles[id]"/> 
        </div>
      </div>
    </div>

    <Footer />

  </div>

</template>

<script>
import Header from '../components/Header'
import FeaturedPost from '../components/FeaturedPost'
import Footer from '../components/Footer'

import NewsApiService from '../services/NewsApiService.js'

export default {
  name: 'Home',
  asyncComputed: {
    async articles() {  
      return await NewsApiService.getArticles()
    },
    async keys () {  
      return await NewsApiService
                .getArticles()
                .then(articles => Object.keys(articles))
    }  
  },
  components: { Header, FeaturedPost, Footer }
}
</script>