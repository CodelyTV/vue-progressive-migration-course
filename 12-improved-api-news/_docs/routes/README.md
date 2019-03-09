# Mejorando la gestión de datos en el frontend

[![Mejorando la gestión de datos en el frontend](./img/cover-api-news-enhanced.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

Con la implementación actual tenemos 2 problemas que hay que arreglar:

- Los comentarios son compartidos por TODOS los articulos (necesitamos un sistema que guarde comentarios POR articulo)
- La manera de obtener los artículos es _sucia_ (los componentes no deberían tener la preocupación de CÓMO obtener los datos)
  - Artículos → `this.$root.$data.articles`
  - Cada artículo → `article: this.$root.$data.articles.filter( ({ key }) => key === this.$route.params.id)[0]`

## Servicio mejorado

Aprovechando el cacheado de modulos de `require` (o `import`) → si exportamos una instancia, todos los import `import` accederán al mismo objeto

https://stackoverflow.com/questions/8887318/understanding-node-js-modules-multiple-requires-return-the-same-object

Así que teniendo esto en cuenta, podemos hacer...

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

Preparamos nuestra instancia para que guarde los datos y los métodos para actualizarlos (_añadir artículo_ y _añadir comentarios a cada artículo_)
De regalo, implementamos un sístema de cachí interno 

Por tanto, esta instancia nos proveerá de métodos para cada necesidad (relativa a los datos) → `addComment`, `getArticle`, `getArticles`

> Extra: Esta instancia (exportada) se ha hecho global (en el código del repo) para que podamos ver su contenido desde la consola

Resumiendo: con esta implementación podemos importar el servicio directamente en aquellos componentes que necesiten acceder a estos datos (nos estamos acercando poco a poco a una gestión de estado externa tipo Vuex)

> Échale un vistazo a `src/pages/Home.vue` & `src/pages/Post.vue` para ver cómo se utiliza todo esto en los componentes


## Datos asíncronos

Uilizamos el plugin [`vue-async-computed`](https://github.com/foxbenjaminfox/vue-async-computed) para poder tener datos `computed` asíncronos

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

## Pequeñas mejoras extras

- helper `getDomain` para poder adjuntar a cada artículo la fuente (que mostramos en vez del autor)
- Añadimos un enlace al artículo original

---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/tree/master/12-improved-api-news)

