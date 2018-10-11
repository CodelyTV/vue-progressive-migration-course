<template>
  <div>
    <div class="container">

      <Header />
      <!-- <LongFeatured /> -->

      <div class="row mb-2">
        <div 
          v-for="article in articles" 
          :key="article.key" 
          class="col-md-6"
        > 
          <FeaturedPost :article="article"/> 
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

export default {
  name: 'Home',
  computed: {
    articles: function() { return this.$root.$data.articles } 
  },
   components: { Header, FeaturedPost, Footer }
}
</script>