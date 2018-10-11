# CLI version & modular components

Dev Version is launched w/ → `yarn serve`
A Production version can be created w/  → `yarn build` (it will be created in a `dist` folder)

## Styles

We add `bootstrap` to `public/index.html`

```html
<!-- Bootstrap core CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
```

and load css through `main.js` (thanks to webpack css loader)

```javascript...
import './css/main.css'
...
```

## Directories structure

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


## `.vue` files

<small>Local Registration Components → https://vuejs.org/v2/guide/components-registration.html#Local-Registration</small> 


We can now combine `template`, `script`and `style` blocks under the same file

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

`WidgetTemperature.vue` is now a component

`BlogPost.vue`, `FeaturedPost.vue`, `Footer.vue`, `Header.vue`, `LongFeatured.vue`, `Post.vue` are just _view_ components

<small>Local Registration Components → https://vuejs.org/v2/guide/components-registration.html#Local-Registration</small> 

## `Widget.vue`

<small>Slots → https://vuejs.org/v2/guide/components-slots.html</small> 
<small>Class bindings → https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax</small> 


#### Use of `slot`

```javascript
<template>
  <div>
    ...  
    <slot></slot>
  </div>
</template>
```

So then we can do...

```javascript
<Widget title="Archives">
  <ol class="list-unstyled">
    <li><a href="#">GitHub</a></li>
    <li><a href="#">Twitter</a></li>
    <li><a href="#">Facebook</a></li>
  </ol>
</Widget>
```

or...

```javascript
<Widget title="Temperatura">
  <WidgetTemperature />
</Widget>           
```

#### Conditional classes

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



