<template>
  <div id="app d-flex">
    <Nav v-if="!navLess()"></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue"

export default {
  data () {
    return {
      navLessRoutes: [
        "/", "/logout", "/login", "/register"
      ]
    }
  },
  components: {
    Nav
  },
  methods: {
    navLess () {
      return this.navLessRoutes.includes(this.$route.path)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
