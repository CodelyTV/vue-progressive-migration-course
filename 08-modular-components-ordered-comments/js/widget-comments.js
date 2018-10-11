import CommentsForm from './components/CommentsForm.js'
import CommentsList from './components/CommentsList.js'

import comments_data from './data/comments.js'
import {guid} from './helpers/index.js'

new Vue({ 
  el: "#comments_block",
  data: {
    comments: comments_data
  },
  components: {
    CommentsForm,
    CommentsList
  },
  methods: {
    addComment: function({ username, comment }) {
      comments_data.push({
        id: guid(),
        username,
        comment,
        date: moment().valueOf()
      })
    }
  }
})