# Modular Components and ordered comments

## Modules in the browser

Simplify loading w/ the `type="module"` in the `script` tag to _enable_ es2015 modules in the browser

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

So then we can do from our `type="module"` file...

**`widget-comments.js`**

```javascript
import CommentsForm from './components/CommentsForm.js'
import CommentsList from './components/CommentsList.js'

import comments_data from './data/comments.js'
import {guid} from './helpers/index.js'

new Vue({ 
  ...
})
```

## Comments Order on `computed` property

<small>Computed Properties → https://vuejs.org/v2/guide/computed.html</small> 
<small>Computed Caching vs Methods → https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods</small> 


We can use `_.orderBy` from the lodash library to provide an ordered comments array available from the template...

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
