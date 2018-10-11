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
