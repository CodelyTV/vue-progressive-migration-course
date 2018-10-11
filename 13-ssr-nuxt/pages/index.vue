<template>
  <div>
    <div class="container">

      <Header />
      <!-- <LongFeatured /> -->

      <div
        v-if="articles"
        class="row mb-2"
      >
        <div
          v-for="id in keys"
          :key="id"
          class="col-md-6"
        >
          <FeaturedPost
            :id="id"
            :article="articles[id]"
          />
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
  async asyncData() {
    const articles = await NewsApiService.getArticles()
    const keys = Object.keys(articles)
    return { articles, keys }
  },
  components: { Header, FeaturedPost, Footer }
}
</script>
