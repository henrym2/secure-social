<template>
  <div id="app" class="d-flex flex-column">
    <Nav></Nav>
    <div>
      <Feed class="d-flex flex-column feed"></Feed>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav'
// import Login from './components/Login'
// import NewPost from './components/NewPost'
// import Post from './components/Post'
import Feed from './components/Feed'

export default {
  name: 'App',
  components: {
    Nav,
  //  Login
  // Post
    Feed
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}

.feed {
  align-items: center;
  justify-content: center;
}
</style>
