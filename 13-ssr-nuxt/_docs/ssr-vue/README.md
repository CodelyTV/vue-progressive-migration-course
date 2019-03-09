# SSR con Nuxt

[![SSR con Nuxt](./img/cover-ssr-vue.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

Vamos a generar la versión SSR de nuestra aplicación Vue. Es decir, que con practicamente el mismo código vamos a montar un sistema donde al solicitar la páginas de nuestra app, un servidor devolverá el HTML con el contenido renderizado y además _hidratará_ este contenido para aplicar la funcionalidad definida desde Vue

Para ello vamos a utilizar [Nuxt](https://nuxtjs.org/)

## Creación de un proyecto con Nuxt 

Utilizamos `npx` para utilizar directamente `create-nuxt-app` y crear un nuevo proyecto con Nuxt

```
npx create-nuxt-app my-demo-nuxt-app
```

Esto nos lanzará un asistente que nos irá preguntando qué queremos utilizar en nuestro proyecto...

```
⬢  __temp  npx create-nuxt-app my-demo-nuxt-app
> Generating Nuxt.js project in /Volumes/RINGO/PROJECTS/2019/__temp/my-demo-nuxt-app
? Project name my-demo-nuxt-app
? Project description My solid Nuxt.js project
? Use a custom server framework express
? Use a custom UI framework bootstrap
? Choose rendering mode Universal
? Use axios module yes
? Use eslint yes
? Use prettier yes
? Author name JuanMa Garrido
? Choose a package manager yarn
```

## Migrando nuestra app a Nuxt

Copiamos la carpeta `components` (tal cual está) a la raíz de nuestro proyecto

### La carpeta `pages` 

Las rutas se definen con la nomenclatura de archivos en la carpeta `pages`

```
├── pages
│   ├── index.vue
│   └── post
│       └── _id.vue
```

Con esta estructura estamos definiendo con vue 2 rutas:
- La ruta →`/` gestionada por `index.vue`
- La ruta → `/post/:id` gestionada por `post/_id.vue`

### `nuxt.config.js`

Este es el "alma" de nuestro. Aunque Nuxt está preconfigurado para que funcione por defecto en la mayoría de los casos, en el archivo [`nuxt.config.js`](https://nuxtjs.org/guide/configuration/) podemos sobreescribir esta configuración por defecto ya aadir la nuestra propia

En nuestro caso añadimos la ruta de nuestro custom CSS

```
css: [
    '@/assets/css/main.css'
  ],
```

### Async Data

Nuxt nos provee de [`asyncData`](https://nuxtjs.org/guide/async-data#the-asyncdata-method) que ya se entiende bien con el sistema SSR de Nuxt.

En nuestro `pages/index.vue` lo utilizamos así...

```js
... 
async asyncData() {
  const articles = await NewsApiService.getArticles()
  const keys = Object.keys(articles)
  return { articles, keys }
},
...
```

Con este método `asyncData` preparamos nuestra app SSR para que haga esta petición asíncrona como corresponda

> Sometimes you just want to fetch data and pre-render it on the server without using a store. asyncData is called every time before loading the page component. It will be called server-side once (on the first request to the Nuxt app) and client-side when navigating to further routes. This method receives the context as the first argument, you can use it to fetch some data and Nuxt.js will merge it with the component data.

> Nuxt.js will automatically merge the returned object with the component data.

- Si la petición es _server-side_ se esperará a la respuesta para devolver el HTML renderizado con los datos requeridos
- Si la petición es _client-side_ se lanzará la petición al montar el componente y asincronamente se mostrarán cuando se reciban

En nuestro `pages/post/_id.vue` además aprovechamos que asyncData va a recibir un objeto _context_ con diferentes propiedades, por ejemplo, [las relativas a las rutas](https://nuxtjs.org/guide/async-data#accessing-dynamic-route-data)

```js
...
async asyncData({ route }) {
  const idArticle = route.params.id
  const article = await NewsApiService.getArticle(idArticle)
  return { idArticle, article }
},
...
```

## Lanzando nuestra SSR

Nuxt nos deja preparados una serie de _comandos_ NPM entre los cuales tenemos `dev` que nos lanzará un servidor local con nuestra app

Así, haciendo `yarn dev` podremos acceder desde el navegador a la URL propuesta para ver nuestra app SSR


---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/codelyTV/vue-progressive-migration-course/blob/master/13-ssr-nuxt/)

