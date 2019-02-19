# Planteamiento estructura de componentes y Vue.js DevTools

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

## Refactorizando a estructura componentes

[![Planteamiento estructura de componentes y Vue.js DevTools](./img/cover-estructura-componentes.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  


En los siguientes videos vamos a construir una serie de componentes que nos permitan implementar esta funcionalidad

![Comments in action](./img/comments-in-action.gif)

con este código en el HTML

```html
<div class="comments" id="comments_block">
	 <comments-form @add-comment="addComment($event)"></comments-form>
	 <comments-list :comments="comments"></comments-list>
</div>
```

## Vue.js DevTools

[![Planteamiento estructura de componentes y Vue.js DevTools](./img/cover-devtools.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

Para trabajar con Vue en Chrome utilizaremos  esta extensión que te puedes instalar desde [aqui](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=es) 
