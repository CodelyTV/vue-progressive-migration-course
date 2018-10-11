 <template>
  <div class="blog-post" >
    <h2 class="blog-post-title">{{ title }}</h2>
    <p class="blog-post-meta">{{ date }} by <a href="#">{{ author }}</a></p>
    <div v-html="content" />
  </div><!-- /.blog-post -->  
 </template>
 
 <script>
export default {
  props: {
    title: String,
    author: String,
    date: String,
    content: String
  }
}
</script>