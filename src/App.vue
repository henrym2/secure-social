<template>
  <div id="app">
    <NewPost></NewPost>
  </div>
</template>

<script>
// import Nav from './components/Nav'
// import Login from './components/Login'
import NewPost from './components/NewPost'
export default {
  name: 'App',
  components: {
  //  Nav,
  //  Login
  NewPost
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
