<template>
  <form
    class="comments_form"
    @submit.prevent="handleSubmit"
  >
    <h3 class="mb-4">Add a comment</h3>
    <div class="form-group">
      <label for="username">Your Name</label>
      <input
        id="username"
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Enter your username"
      >
    </div>

    <div class="form-group">
      <label for="comments">Comments </label>
      <textarea
        id="comments"
        v-model="comment"
        class="form-control"
        rows="3"
      />
    </div>

    <div class="form-check">
      <input
        id="userAgreement"
        class="form-check-input"
        type="checkbox"
        value="1"
      >
      <label
        class="form-check-label"
        for="userAgreement"
      >
        I accept <a href="#">user agreement</a>
      </label>
    </div>

    <div class="mt-3">
      <button
        type="submit"
        class="btn btn-outline-primary"
      >Add Comment!</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    addComment: {
      type: Function,
      default: () => {}
    }
  },
  data: function() {
    return {
      username: '',
      comment: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('add-comment', {
        username: this.username,
        comment: this.comment
      })
      this.username = this.comment = ''
    }
  }
}
</script>
