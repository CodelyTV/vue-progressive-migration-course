# Componente comentario: CommentsItem

[![Escenario - HTML+CSS+JS Nativo](./img/cover-comments-item.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

Vamos a generar un componente `comentsItem` de manera que luego podamos utilizarlo así

```html
<comments-item
  avatar="http://demos.themes.guide/bodeo/assets/images/users/m103.jpg" 
  username="admin"
  date="Today, 2:38"
  comment="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo."
></comments-item>
```

## Instancia Vue

Para ello lo primero creamos una instancia Vue que nos permita tomar el control de un trozo del DOM y poder utilizar "cosas" Vue (por ejemplo, componentes definidos con Vue)

**`widget-comments.js`**
```js
new Vue({ 
  el: "#comments_block"
})
```

Dentro de `#comments_block` podremos hacer uso del component `comments-item` que definimos a continuación

## El componente `comments-item`


Podemos definir componentes utilizando [`Vue.component`](https://vuejs.org/v2/guide/components.html) y pasandole un objeto de configuración que defina el componente

```
Vue.component('comments-item', {
	props: {...},
  template: ...
})
```

### `template`

Para definir un componente como mínimo hay que definir un `template` que es el HTML que se va mostrar cuando se utilize este componente

En nuestro caso, hemos definido el componente con 

```js
template: templateCommentsItem
```

que tenemos definido aqui...

```js
const templateCommentsItem = `
<div class="comment mb-2 row">
  <div class="comment-avatar col-md-1 col-sm-2 text-center pr-1">
    <a href=""><img class="mx-auto rounded-circle img-fluid" :src="avatar"
        alt="avatar"></a>
  </div>
  <div class="comment-content col-md-11 col-sm-10">
    <h6 class="small comment-meta"><a href="#">{{ username }}</a> {{ date }}</h6>
    <div class="comment-body">
      <p>{{ comment }}</p>
    </div>
  </div>

</div>

```

### `props`

También podemos preparar el componente para que reciba datos vía atributos (props) del tag html. Para ello utilizamos [la propiedad `props`](https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props) donde definimos el nombre de cada prop, y opcionalmente el tipo de dato, valores por defecto, etc...

```
props: {
  comment: {
    type: String,
    required: true
  }, 
  username: {
    type: String,
    required: true
  }, 
  avatar: {
    type: String,
    default: 'https://iupac.org/cms/wp-content/uploads/2018/05/default-avatar-300x300.png'
  },
  date: {}
},
```

Estos datos los podremos utilizar en la logica interna del componente y/o mostrarlos en el template






---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/blob/master/04-CommentsItem/)

