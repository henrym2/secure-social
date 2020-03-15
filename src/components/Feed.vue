<template>
  <div>
      <NewPost></NewPost>
      <Post v-for="post in posts" :key="post.id" :title="post.title" :body="post.body"></Post>
  </div>
</template>

<script>
import NewPost from './NewPost'
import Post from './Post'

export default {
  name: "Feed",
  components: {
    NewPost,
    Post
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  data () {
    return {
      posts: [
        {id: 0, title: "Test", body: "Test"},
        {id: 1, title: "Test 2", body: "Test 2"}
      ]
    }
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>

<style>

</style>