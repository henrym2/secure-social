<template>
  <div class="login-container">
      <div class="card login-card shadow d-flex">
        <h3>Login</h3>
        <b-img rounded="circle" src="https://picsum.photos/seed/picsum/125/125?blur"></b-img>
        <br>
        <b-form @submit="login">
          <b-form-group label="Email:">
            <b-form-input label="Email:" placeholder="Enter Email" required v-model="input.email"></b-form-input>
          </b-form-group>
          <b-form-group label="Password:">  
            <b-form-input label="Password:" placeholder="Enter password" required type="password" v-model="input.password"></b-form-input>
          </b-form-group>
          <b-button class="d-flex align-self-center m-auto" variant="primary" @click="login()">Login</b-button>
        </b-form>
        <router-link  class="mt-2" to="/register" >Register</router-link>
        <b-alert
          class="login-fail"
          :show="failed"
          dismissible
          @dismissed="failed = false"
          variant="warning">Login failed</b-alert>
      </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      input: {
        email: "",
        password: "",
      },
      failed: false
    }
  },
  methods: {
    login () {
      const {email, password} = this.input
      if(email != "" && password != "") {
          this.$store.dispatch('login', { email, password }).then(() => {
            this.$router.push("/feed")
          }).catch(() => {
            this.failed = true
          }
          )
        } else {
          this.failed = true
        }
      }
    }
}
</script>

<style>
  .login-container{
    display: flex;
    justify-content: center;
    align-items:center;
    margin-top: 9%;
  }

  .login-card{
    display: flex;
    justify-content: center;
    align-items:center;
    width: 25.2rem;
    height: 27.3rem;
    align-self: center;
  }

  .login-fail{
    position: absolute;
    top: 30rem;
  }
</style>