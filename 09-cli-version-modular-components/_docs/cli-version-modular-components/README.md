# Damos el salto a SPA: Creando la app con VueCLI y Webpack

[![Damos el salto a SPA: Creando la app con VueCLI y Webpack](./img/cover-spa.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

Con [Vue CLI](https://cli.vuejs.org/) (Command Line Interface de Vue) podemos crear rapidamente una estructura de proyecto con toda la configuración necesaria (webpack y demás) para trabajar con Javascript moderno y poder generar un bundle final (un único archivo con toda nuestra app) optimizado

Para [instalar](https://cli.vuejs.org/guide/installation.html) este CLI hacemos `npm install -g @vue/cli`

Una vez instalado como modulo global, desde cualquier carpeta podemos hacer por ejemplo...

```
vue create demo-app-vue
```

lo que nos lanzará un asistente con el que mediante preguntas podremos configurar nuestro proyecto vue (babel, linter)

Este comando nos creará una carpeta `demo-app-vue` y dentro toda el entorno preparado para poder empezar a trabajar

Dentro de la carpeta podemos lanzar un servidor local con el proyecto haciendo → → `yarn serve`
Para crear una versión lista para subir a producción haremos → `yarn build` (esta versión de producción se crea por defecto en la carpeta `dist`)

## Estilos

Tenemos que añadir _bootstrap_ a `public/index.html`

```html
<!-- Bootstrap core CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
```

y cargar ell CSS propio de nuestro proyecto desde `main.js` (esto funcionará gracias al _css loader_ de _webpack_)

```javascript...
import './css/main.css'
...
```

## Estructura de carpetas

La estructura de carpeta que nos tiene que quedar es esta...

```
src
├── App.vue → Main component (loaded in main.js)
├── assets
│   └── logo.png
├── components → Vue components (pieces of our app)
│   ├── BlogPost.vue
│   ├── CommentsForm.vue
│   ├── CommentsItem.vue
│   ├── CommentsList.vue
│   ├── FeaturedPost.vue
│   ├── Footer.vue
│   ├── Header.vue
│   ├── LongFeatured.vue
│   ├── Post.vue
│   ├── Widget.vue
│   └── WidgetTemperature.vue
├── css
│   └── main.css → custom styles (loaded in main.js)
├── data
│   └── comments.js
├── main.js → entry point
├── pages → Vue components for pages (loaded in App.vue)
│   ├── Home.vue
│   └── Post.vue
└── services → Data from external API
    └── WeatherApiService.js
```

Fijaros que hemos dividido nuestra aplicación Vue en muchos más componentes (`Header`, `Footer`,...). Muchos de estos componentes son meros "trozos" visuales que dejamos ya preparados para poder expresar mejor nuestro marcado en Vue (y de paso dejarlo preparado por si que hay que añadir alguna funcionalidad)

**`Footer.vue`**
```js
<template>
    <footer class="blog-footer">
      <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>
</template>
```

Fíjate cómo se utilizan estos componentes en los componentes definidos en pages `Post.vue` y ``Home.vue``


## Archivos `.vue`

Con webpack y el [loader apropiado](https://vue-loader.vuejs.org/guide/) podemos combinar bloques `template`, `script`y `style` en un mismo archivo con extensión `.vue`

**`src/components/CommentsItem.vue`**

```javascript
<template>  
  <div class="comment mb-2 row">
    ...
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data: function () {
      const formattedTime = moment(this.date).fromNow()
      return { formattedTime }
    },
    props: {
    ...
    }
  }
</script>
```

De esta manera por ejemplo hemos creado el componente `WidgetTemperature.vue` con la lógica que ya teníamos, de tal manera que podemos utilizarlo directamente con `<WidgetTemperature />`

`BlogPost.vue`, `FeaturedPost.vue`, `Footer.vue`, `Header.vue`, `LongFeatured.vue`, `Post.vue` son simplemente componentes de _vista_


Todos estos componentes, para poder utilizarlos, los [registramos localmente](https://vuejs.org/v2/guide/components-registration.html#Local-Registration) en un componente _padre_

```
<script>
import Header from '../components/Header'
import LongFeatured from '../components/LongFeatured'
import FeaturedPost from '../components/FeaturedPost'
import BlogPost from '../components/BlogPost'
import Widget from '../components/Widget'
import WidgetTemperature from '../components/WidgetTemperature'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: { Header, LongFeatured, FeaturedPost, BlogPost, Widget, Footer, WidgetTemperature }
}
</script>
```

## `Widget.vue`

<small>Slots → https://vuejs.org/v2/guide/components-slots.html</small> 
<small>Class bindings → https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax</small> 


#### Uso de `slot`

```javascript
<template>
  <div>
    ...  
    <slot></slot>
  </div>
</template>
```

Con <slot></slot> podemos dejar preparado nuestro componente para que admita _children_, es decir, para que admita tags dentro de él

Por ejemplo...

```javascript
<Widget title="Archives">
  <ol class="list-unstyled">
    <li><a href="#">GitHub</a></li>
    <li><a href="#">Twitter</a></li>
    <li><a href="#">Facebook</a></li>
  </ol>
</Widget>
```

o...

```javascript
<Widget title="Temperatura">
  <WidgetTemperature />
</Widget>           
```

#### Clases condicionales

Podemos aprovechar las propiedades `computed` para definir una serie de clases dinámicas que serán aplicadas en función del valor de otras propiedades

Una vez definidas estas clases (en forma de objeto `classObject`) a través de `computed`, las aplicamos con [`v-bind:class`](https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax) que espera un objeto con las clases a aplicar

```javascript

<template>
  <div 
    class="p-3"
    :class="classObject"
  >
      <h4 class="font-italic">{{ title }}</h4>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Widget',
  computed: {
    classObject: function() {
      return {
        'mb-3': this.isFeatured,
        'bg-light': this.isFeatured,
        'rounded': this.isFeatured,
      }
    }
  },
  props: {
    title: String,
    isFeatured: Boolean
  }
}
</script>
```


---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/tree/master/09-cli-version-modular-components)

