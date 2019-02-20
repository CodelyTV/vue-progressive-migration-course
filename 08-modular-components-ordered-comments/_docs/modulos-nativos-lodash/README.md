# Usando módulos con soporte nativo de navegador y Lodash

[![Usando módulos con soporte nativo de navegador y Lodash](./img/cover-modulos-nativos)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

## Modulos en el navegador

En las última versiones de Chrome tenemos ya soporte nativo a los módulos de ES2015. Es decir que podemos reestructurar nuestro proyecto para importar (con [`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)) y exportar (con [`export`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)) cosas de nuestros archivos

Para ello, hay que añadir `type="module"` en el tag `script` para _habilitar_ el uso de modulos es2015 desde en ese fichero

👉 El soporte en Navegadores a esta feature lo tienes [aqui](https://caniuse.com/#feat=es6-module)

**`post.html`**

```html
<!-- VUE -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- HELPER LIBRARIES -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"></script>
<script src="https://momentjs.com/downloads/moment.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>

<!-- VUE APP -->
<script type="module" src="js/widget-weather.js"></script> 
<script type="module" src="./js/widget-comments.js"></script>
```

Con esto, ya podemos hacer (en los archivos cargados con `type="module"`)...

**`widget-comments.js`**

```javascript
import CommentsForm from './components/CommentsForm.js'
import CommentsList from './components/CommentsList.js'

import comments_data from './data/comments.js'
import {guid} from './helpers/index.js'

new Vue({ 
  ...
  components: {}
  ...
})
```

Cargamos el objeto de configuración que define cada componente y [los registramos localmente con la propiedad `components`](https://vuejs.org/v2/guide/components-registration.html#Local-Registration) del objeto que le pasamos a `new Vue()`

## Ordenando los comentarios a través de una propiedad `computed`

<small>Computed Properties → https://vuejs.org/v2/guide/computed.html</small> 
<small>Computed Caching vs Methods → https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods</small> 


Podemos utilizar [`_.orderBy`](https://lodash.com/docs/4.17.11#orderBy) de la librería [lodash](https://lodash.com/) para dejar disponible (el template de `comments-list`) el array de comentarios ordenado...

**`components/CommentsList.js`**

```javascript
...
export default {
  props: ['comments'],
  components: { CommentsItem },
  computed: {
    orderedComments: function () {
      return _.orderBy(this.comments, 'date', 'desc')
    }
  },
  template: templateCommentsList
}
```

Bajo la propiedad [`computed`](https://vuejs.org/v2/guide/computed.html) podemos dejar disponibles valores que se van a recalcular cuando alguno de los elementos que utilice para su cálculo, cambie (`this.comments` en nuestro caso)


---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/tree/master/08-modular-components-ordered-comments)

