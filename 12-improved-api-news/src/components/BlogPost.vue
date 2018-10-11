 <template>
  <div class="blog-post" >
    <h2 class="blog-post-title">{{ title }}</h2>
    <p class="blog-post-meta">{{ publishedAt }} at <a target="_blank" :href="hrefSource">{{ source }}</a></p>
    <div class="mb-2" v-html="content" />
    <a target="_blank" :href="href">🧐 Read Full Article</a>
  </div><!-- /.blog-post -->  
 </template>
 
 <script>

import moment from 'moment'
import {getUrlDomain} from '../helpers'

export default {
  props: {
    title: String,
    author: String,
    date: String,
    content: String,
    href: String,
    source: String
  },
  computed: {
    publishedAt: function() {
      return moment(this.date).fromNow()
    },
    hrefSource: function() {
      return getUrlDomain(this.href)
    }
  }
}
</script>