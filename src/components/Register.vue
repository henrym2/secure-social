<template>
  <div class="login-container">
      <div class="card login-card shadow d-flex">
        <h3>Register</h3>
        <b-img rounded="circle" src="https://picsum.photos/seed/picsum/125/125?blur"></b-img>
        <br>
        <b-form @submit="register">
          <b-form-group label="Email:">
            <b-form-input label="Email:" placeholder="Enter Email" required v-model="input.email"></b-form-input>
          </b-form-group>
          <b-form-group label="Password:">
            <b-form-input label="Password:" placeholder="Enter password" required type="password" v-model="input.password"></b-form-input>
          </b-form-group>
          <b-button class="d-flex align-self-center m-auto" variant="primary" @click="register()">Register</b-button>
        </b-form>
        <router-link class="mt-2" to="/login">Login</router-link>
      </div>
  </div>
</template>

<script>
// const BOX_ID = process.env.VUE_APP_BOX_ID
export default {
  name: "Login",
  data () {
    return {
      input: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    register () {
        const {email, password} = this.input
        const { privateKey, publicKey } = this.generateKey()
        let data = {email, password, privateKey, publicKey}
        this.$store.dispatch('register',data).then(() => {
          this.$router.push('/feed')
        }).catch(err => console.error(err))
        
        // await this.$jsonbox.create({email, password, publicKey, privateKey})
    },
    generateKey() {
      return {privateKey: "a", publicKey: "b"}  
    } 
  },
  

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
</style>