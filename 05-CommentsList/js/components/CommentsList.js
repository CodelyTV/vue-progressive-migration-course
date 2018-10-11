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

Vue.component('comments-list', {
	props: ['comments'],
  template: templateCommentsList
})