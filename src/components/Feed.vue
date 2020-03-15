<template>
  <div>
      <NewPost @formSubmit="post"></NewPost>
      <Post v-for="post in posts" :key="post._id" :title="post.title" :body="post.body"></Post>
  </div>
</template>

<script>
import NewPost from './NewPost'
import Post from './Post'
const BOX_ID = process.env.VUE_APP_BOX_ID

export default {
  name: "Feed",
  components: {
    NewPost,
    Post
  },
   data () {
    return {
      posts: [],
      user: this.$store.state.user
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
  },
  mounted () {
    this.$jsonbox.read(BOX_ID, "posts").then((result) => {
        if (result.length <= 0) {
          this.posts = [{
          _id: 0, title: "NO POSTS FOUND", body: "NO POSTS FOUND", author: "NONE", encrypt: false
        }]
        } else {
          this.posts = result
        }
      }).catch(() => {
        this.posts = [{
          _id: 0, title: "NO POSTS FOUND", body: "NO POSTS FOUND", author: "NONE", encrypt: false
        }]
      })
  },
  methods: {
    post (post) {
      this.$jsonbox.create(post, BOX_ID, "posts").then((res) => {
        this.posts.append(res)
      })
    }
  }
}
</script>

<style>

</style>