<template>
    <div>
        <div v-if="isErrored"
             class="error">You provided a wrong username of password
        </div>
        <input v-model="username"
               placeholder="Username"
               type="text">
        <input v-model="password"
               placeholder="Password"
               type="password">
        <button @click.prevent="tryToLogin">Log In</button>
        <router-link :to="{name: 'register'}">Register</router-link>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            username : '',
            password : '',
            isErrored: false,
        };
    },
    methods: {
        tryToLogin() {
            this.$store.dispatch('login', {username: this.username, password: this.password})
                .then(result => result ? this.goToAdmin() : this.isErrored = true);
        },
        goToAdmin() {
            this.$router.push({name: 'admin:home'});
        },
    },
    created() {
        if (this.$store.getters.isUserLogged()) this.$router.push({name: 'admin:home'});
    },
};
</script>

<style scoped>

</style>
