# API News

## The Service ApiNews

New Service created at **`src/services/NewsApiService.js`**

```javascript
import axios from 'axios'
import md5 from 'md5'

export default class NewsApiService {
  constructor(api_key) {
    this.getUrlApiNews = this.getUrlApiNews.bind(
      this,
      api_key
    )
  }
  getNews(query) {
    const url = this.getUrlApiNews(query)
    return axios
      .get(url)
      .then(({ data }) => data)
      .then(({ articles }) => articles)
      .then( articles  => articles.reduce( (acc, article) => {
        const {url} = article
        const key = md5(url)
        return [ { key,...article },...acc]
      }, []) )
  }
  getUrlApiNews(api_key, query) {
    return `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=popularity&apiKey=${api_key}`
  }
}
```

We get the data and we tune them a bit to create a consistent ID from the URL

We can use it from `App.vue`.
We load the data on instantiation of the component (`created`)

```javascript
import NewsApiService from './services/NewsApiService.js'

const API_KEY = 'ba2a4f83ceda44eaae1ae4d972c14fdb'
const service = new NewsApiService(API_KEY)

const DEFAULT_QUERY='javascript'

export default {
  name: 'App',
  data: function() {
    return {
      articles: []
    }
   },
  created: function () {
    service.getNews(DEFAULT_QUERY)
      .then(this.setArticles)
  },
  methods: {
    setArticles: function(articles) {
        this.articles = articles
      }
  }
}
```

## More dynamic Home

```javascript
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
```


## The new route → PostDetails

**`src/router/index.js`**

```javascript
...
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home }, 
    { path: '/home', component: Home }, 
    { name:'PostDetails', path: '/post/:id', component: Post }
  ]
})
```

[Link to this route with dynamic ID ](https://github.com/juanmaguitar/vue-progressive-migration-demo/commit/14aa873fd9b91dea4d9c3aa96a673a6ed211d67d#diff-81907ef92feb4a5898945df1496c97a4R6)

And the component that handles it

**`src/pages/Post.js`**

```javascript

<template>
  ...
  <BlogPost 
    :img="article.urlToImage"
    :title="article.title"
    :date="article.publishedAt"
    :author="article.author"
    :content="article.content" 
  />
  ...
</template>

export default {
  name: 'Home',
  data: function() {
    return {
      comments: comments_data,
      content: content_post,
      article: this.$root.$data.articles.filter( ({ key }) => key === this.$route.params.id)[0]
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
```

