<template>
  <div>
    <h3 class="mb-4">Comments</h3>

    <comments-item
      v-for="comment in orderedComments"
      :key="comment.id"
      :username="comment.username"
      :avatar="comment.avatar"
      :date="comment.date"
      :comment="comment.comment"
    />

  </div>
</template>


<script>
import _ from 'lodash'

import CommentsItem from './CommentsItem'

export default {
  components: { CommentsItem },
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  computed: {
    orderedComments: function() {
      return _.orderBy(this.comments, 'date', 'desc')
    }
  }
}
</script>
