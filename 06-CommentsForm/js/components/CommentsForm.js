const templateCommentsForm = `
<form class="comments_form" @submit.prevent="handleSubmit">
  <h3 class="mb-4">Add a comment</h3>
  <div class="form-group">
      <label for="username">Your Name</label>
      <input v-model="username" type="text" class="form-control"
              id="username" placeholder="Enter your username">
    </div>
  
    <div class="form-group">
    <label for="comments">Comments </label>
    <textarea v-model="comment" class="form-control" id="comments" rows="3"></textarea>
  </div>

  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="1" id="userAgreement">
    <label class="form-check-label" for="userAgreement">
      I accept <a href="#">user agreement</a>
    </label>
  </div>

  <div class="mt-3">
    <button type="submit" class="btn btn-outline-primary">Add Comment!</button>
  </div>
</form>
`

Vue.component('comments-form', {
  props: ['addComment'],
  data: function() {
  	return {
      username: '',
      comment: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("add-comment", {
        username: this.username,
        comment: this.comment
      });
    }
  },
  template: templateCommentsForm
})