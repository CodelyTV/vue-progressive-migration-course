<template>
  <div class="blog-post">
    <h2 class="blog-post-title">{{ title }}</h2>
    <p class="blog-post-meta">{{ publishedAt }} at
      <a
        :href="hrefSource"
        target="_blank"
      >{{ source }}</a>
    </p>
    <div
      class="mb-2"
      v-html="content"
    />
    <a
      :href="href"
      target="_blank"
    >🧐 Read Full Article</a>
  </div><!-- /.blog-post -->
</template>

<script>
import moment from 'moment'
import { getUrlDomain } from '../helpers'

export default {
  props: {
    title: {
      type: String,
      default: 'default title'
    },
    author: {
      type: String,
      default: 'me'
    },
    date: {
      type: String,
      default: 'today'
    },
    content: {
      type: String,
      default: 'default content'
    },
    href: {
      type: String,
      default: '#'
    },
    source: {
      type: String,
      default: 'default source'
    }
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
