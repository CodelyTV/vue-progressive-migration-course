# Componente comentario: CommentsList

[![Componente comentario: CommentsList](./img/cover-comments-list.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

Vamos a generar un componente `comments-list` de manera que luego podamos utilizarlo así

```html
<div class="comments" id="comments_block">
    <comments-list :comments="comments"></comments-list>
</div>
```

Añadimos un nuevo archivo a nuestra carpeta `components`

```
│   ├── components
│   │   ├── CommentsItem.js
│   │   └── CommentsList.js
```

Y cargamos este nuevo archivo en nuestro `post.html`

```html
  <script src="js/components/CommentsList.js"></script>
```

- `widget-comments.js` → Instancia Vue que tomará el control del bloque de HTML (y donde utilizaremos nuestro componente Vue)
- `components/CommentsItem.js` → Definición del componente `comments-item`


## Instancia Vue

Nuestra instancia Vue ahora va a contener más cosas. Vamos a definir esta instancia con los datos que le vamos a pasar a `comments-list`

**`widget-comments.js`**
```js
const comments_data = [...]

new Vue({ 
  el: "#comments_block",
  data: {
    comments: comments_data
  }
})
```

Dentro de `#comments_block` tendremos acceso a `comments` que le podremos pasar vía props a `comments-list`

## El componente `comments-list`

Definimos el componente `comments-list` preparado para recibir una prop `comments`

```js
Vue.component('comments-list', {
	props: ['comments'],
  template: templateCommentsList
})
```

## `template`

En este caso es en el template donde ocurre la magia

```js
const templateCommentsList = `
<div>
  <h3 class="mb-4">Comments</h3>

  <comments-item 
    v-for="comment in comments" 
    :key="comment.id"
    :username="comment.username"
    :avatar="comment.avatar"
    :date="comment.date"
    :comment="comment.comment"
  ></comments-item>

</div>
`
```

Gracias a la directiva [`v-for`](https://vuejs.org/v2/guide/list.html) podemos renderizar una lista de elementos basados en un array (como es nuestro caso con el array `comments`)

Esta directiva utiliza la sintaxis `item in items` donde `items` es el array fuente e `item` es un _alias_ que representa a cada posición del array que está siendo iterado

En nuestro caso 

```
v-for="comment in comments" 
```

Con esta directiva aplicada a `comments-item`, éste componente se repetirá tantas veces como elementos haya en el array `comments`. Además en cada iteración, podemos pasarle a `comments-item` los valore de cada posición de `comments` que están bajo el alias `comment` 

```
:username="comment.username"
:avatar="comment.avatar"
:date="comment.date"
```

Para [pasarle valores via props a un componente dentro de un `v-for` utilizamos `v-bind`](https://vuejs.org/v2/guide/list.html#v-for-with-a-Component) o su [variante shortcut → `:`](https://vuejs.org/v2/guide/syntax.html#v-bind-Shorthand)

Ademas, todos los componentes iterados deben recibir un [`:key` con valores diferentes](https://vuejs.org/v2/guide/list.html#v-for-with-a-Component)

---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/blob/master/05-CommentsList/)

