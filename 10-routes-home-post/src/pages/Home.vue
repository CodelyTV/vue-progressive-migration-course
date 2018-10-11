<template>
  <div>
    <div class="container">

      <Header />
      <LongFeatured />

      <div class="row mb-2">
        <div class="col-md-6">
          <FeaturedPost />
        </div>
        <div class="col-md-6">
          <FeaturedPost />
        </div>
      </div>
    </div>

    <Footer />

  </div>

</template>

<script>
import Header from '../components/Header'
import LongFeatured from '../components/LongFeatured'
import FeaturedPost from '../components/FeaturedPost'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: { Header, LongFeatured, FeaturedPost, Footer }
}
</script>