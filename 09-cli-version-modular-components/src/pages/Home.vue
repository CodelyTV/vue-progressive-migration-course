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

    <main role="main" class="container">
      <div class="row">
        <div class="col-md-8 blog-main">
          <h3 class="pb-3 mb-4 font-italic border-bottom">
            From the Firehose
          </h3>

          <BlogPost />         
          <BlogPost />         

          <nav class="blog-pagination">
            <a class="btn btn-outline-primary" href="#">Older</a>
            <a class="btn btn-outline-secondary disabled" href="#">Newer</a>
          </nav>

        </div><!-- /.blog-main -->

        <aside class="col-md-4 blog-sidebar">
          
          <Widget title="About" isFeatured>
              <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          </Widget>
        

          <Widget title="Temperatura">
            <WidgetTemperature />
          </Widget>
                    
          <Widget title="Archives">
             <ol class="list-unstyled mb-0">
              <li><a href="#">March 2014</a></li>
              <li><a href="#">February 2014</a></li>
              <li><a href="#">January 2014</a></li>
              <li><a href="#">December 2013</a></li>
              <li><a href="#">November 2013</a></li>
              <li><a href="#">October 2013</a></li>
              <li><a href="#">September 2013</a></li>
              <li><a href="#">August 2013</a></li>
              <li><a href="#">July 2013</a></li>
              <li><a href="#">June 2013</a></li>
              <li><a href="#">May 2013</a></li>
              <li><a href="#">April 2013</a></li>
            </ol>
          </Widget>

           <Widget title="Archives">
             <ol class="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          </Widget>

        </aside><!-- /.blog-sidebar -->

      </div><!-- /.row -->

    </main><!-- /.container -->

    <Footer />

  </div>

</template>

<script>
import Header from '../components/Header'
import LongFeatured from '../components/LongFeatured'
import FeaturedPost from '../components/FeaturedPost'
import BlogPost from '../components/BlogPost'
import Widget from '../components/Widget'
import WidgetTemperature from '../components/WidgetTemperature'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: { Header, LongFeatured, FeaturedPost, BlogPost, Widget, Footer, WidgetTemperature }
}
</script>