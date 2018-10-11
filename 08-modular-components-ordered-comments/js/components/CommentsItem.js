const templateCommentsItem = `
<div class="comment mb-2 row">
  <div class="comment-avatar col-md-1 col-sm-2 text-center pr-1">
    <a href=""><img class="mx-auto rounded-circle img-fluid" :src="avatar"
        alt="avatar"></a>
  </div>
  <div class="comment-content col-md-11 col-sm-10">
    <h6 class="small comment-meta"><a href="#">{{ username }}</a> {{ formattedTime }}</h6>
    <div class="comment-body">
      <p>{{ comment }}</p>
    </div>
  </div>

</div>
`

export default Vue.component('comments-item', {
  data: function () {
    const formattedTime = moment(this.date).fromNow()
    return { formattedTime }
  },
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
  template: templateCommentsItem
})