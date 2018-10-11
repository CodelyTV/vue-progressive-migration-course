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


