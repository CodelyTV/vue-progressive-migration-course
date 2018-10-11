const comments_data = [
  {
    id: HELPERS.guid(),
    username: "juanma",
    date: moment("2018-01-25").valueOf(),
    comment: "sdfsdf"
  },
  {
    id: HELPERS.guid(),
    avatar: "http://demos.themes.guide/bodeo/assets/images/users/m103.jpg",
    username: "admin", 
    date: moment("2018-03-25").valueOf(),
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."  
  },
  {
    id: HELPERS.guid(),
    avatar: "http://demos.themes.guide/bodeo/assets/images/users/w102.jpg", 
    username: "maslarino", 
    date: moment("2018-05-25").valueOf(),
    comment: "Sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
  }
]

new Vue({ 
  el: "#comments_block",
  data: {
    comments: comments_data
  },
  methods: {
    addComment: function({ username, comment }) {
      comments_data.push({
        id: HELPERS.guid(),
        username,
        comment,
        date: moment().valueOf()
      })
    }
  }
})