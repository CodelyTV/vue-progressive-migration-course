# Improved API News

Problems previous implementation:
- Inability of adding comments to each article
- Dirty way of getting articles data (component shouldn't be concerned about how to get the data)
  - Articles → `this.$root.$data.articles`
  - Each article → `article: this.$root.$data.articles.filter( ({ key }) => key === this.$route.params.id)[0]`

## Improved service 

Take advantage of modules caching of `require` (or `import`) → if we export an instance, all `import` will accces to the same object

https://stackoverflow.com/questions/8887318/understanding-node-js-modules-multiple-requires-return-the-same-object

so taking this into account we can do...

```javascript
import axios from 'axios'
import md5 from 'md5'

const API_KEY = 'ba2a4f83ceda44eaae1ae4d972c14fdb'
const DEFAULT_QUERY = 'javascript'

class NewsApiService {
  constructor(api_key) {
    this.getUrlApiNews = this.getUrlApiNews.bind(
      this,
      api_key
    )
    this.articles = null
    this.query = DEFAULT_QUERY
  }

  getArticle(key) {
    return this.getArticles(this.query).then( articles => articles[key])
  }

  addComment(key, comment) {
    return this.articles[key].comments.push(comment)
  }

  getArticles(query) {
    this.query = query || this.query
    const url = this.getUrlApiNews(this.query)
    return this.articles ? 
      Promise.resolve(this.articles) :
      axios
        .get(url)
        .then(({ data }) => data)
        .then(({ articles }) => articles)
        .then( articles  => articles.reduce( (acc, article) => {
          const {url} = article
          const key = md5(url)
          acc[key] = article
          acc[key].comments = []
          return acc
        }, {}) )
        .then( articles  => {
          this.articles = articles
          return articles
        })
  }

  getUrlApiNews(api_key, query) {
    return `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=popularity&apiKey=${api_key}`
  }
}

export default new NewsApiService(API_KEY)

```

so we can prepare our instance to store the data and methods to update them (add article and add comments to independent articles)
Also implement a caching system
Also implement methods for each need (`addComment`, `getArticle`, `getArticles`)

Tip: The instance has been made global to be able to check the content

So, with this implementation we can import the service directly on those components that needs the data (we're getting a bit closer to a Vuex-like implementation)

→ check `src/pages/Home.vue` & `src/pages/Post.vue`


## Async Data 

We're using [`vue-async-computed`](https://github.com/foxbenjaminfox/vue-async-computed) to have computed data asynchronously 

**`src/main.js`**

```javascript
...
import AsyncComputed from 'vue-async-computed'

...
Vue.use(AsyncComputed)

```

**`src/pages/Home.js`**

```javascript
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
```

## Little Improvements

helper → getDomain
Link to Original Article
Display source instead of author


## Deploy

Just `yarn build` and `now` from `dist` folder