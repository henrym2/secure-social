<template>
        <b-navbar toggleable="lg" type="dark" variant="dark" class="d-flex">
            <b-navbar-brand><router-link class="nav-link" to="/login">Secure-Social</router-link></b-navbar-brand>
            <b-navbar-nav>
                <b-navbar-nav class="mr-auto">
                    <b-nav-item><router-link class="nav-link" to="/feed">Home</router-link></b-nav-item>
                    <b-nav-item><router-link class="nav-link" to="/profile">Profile</router-link></b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav >
                    <b-button class="b-logout" @click="logout()">Logout</b-button>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-navbar>
</template>

<script>
export default {
    name: "Nav",
    methods: {
        logout () {
            this.$store.dispatch('logout').then(() => {
                this.$router.push("/login")
            })
            
        }
    }
}
</script>

<style>
.nav-link {
    color: inherit;
    justify-self: center;
}

.b-logout {
    height: 2.4rem;
    margin-top: 0.65rem;
}
</style>