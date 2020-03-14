<template>
  <div class="login-container">
      <div class="card login-card shadow d-flex">
        <b-img rounded="circle" src="https://picsum.photos/seed/picsum/125/125?blur"></b-img>
        <br>
        <b-form>
          <b-form-group label="Email:">
            <b-form-input label="Email:" placeholder="Enter Email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Password:">
            <b-form-input label="Password:" placeholder="Enter password" required type="password"></b-form-input>
          </b-form-group>
          <b-button class="d-flex align-self-center ml-auto" variant="primary">Login</b-button>
        </b-form>
      </div>
  </div>
</template>

<script>
export default {
  name: "Login"
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