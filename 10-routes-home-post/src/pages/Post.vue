<template>
  <div>
    <div class="container">
      <Header />
    </div>

    <main role="main" class="container">
      <div class="row">
        <div class="col-md-8 blog-main">
          <h3 class="pb-3 mb-4 font-italic border-bottom">
            From the Firehose
          </h3>

          <BlogPost 
            title="Sample blog post"
            date="June 14th, 2017"
            author="juanma"
            :content="content" 
          />
          <CommentsForm @add-comment="addComment($event)"/>
          <CommentsList :comments="comments"/>          

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
import uuidv4 from 'uuid/v4'
import moment from 'moment'

import Header from '../components/Header'
import BlogPost from '../components/BlogPost'
import Widget from '../components/Widget'
import WidgetTemperature from '../components/WidgetTemperature'
import Footer from '../components/Footer'
import CommentsForm from '../components/CommentsForm'
import CommentsList from '../components/CommentsList'

import comments_data from '../data/comments.js'
import content_post from '../data/content_post.js'

export default {
  name: 'Home',
  data: function() {
    return {
      comments: comments_data,
      content: content_post
    } 
  },
  methods: {
    addComment: function({ username, comment }) {
      comments_data.push({
        id: uuidv4(),
        username,
        comment,
        date: moment().valueOf()
      })
    }
  },
  components: { Header, BlogPost, Widget, Footer, WidgetTemperature, CommentsForm, CommentsList }
}
</script>