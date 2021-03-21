<template>
    <div>
        <div v-if="errorMessage.length !== 0"
             class="error">
            {{ errorMessage }}
        </div>
        <input v-model="username"
               placeholder="Username"
               type="text">
        <input v-model="password"
               minlength="4"
               placeholder="Password"
               type="password">
        <input v-model="confirmPassword"
               :class="confirmPassword !== password ? 'bad' : ''"
               minlength="4"
               placeholder="Confirm your password"
               type="password">
        <button @click.prevent="tryToRegister">Register</button>
        <router-link :to="{name: 'login'}">Login</router-link>
    </div>
</template>

<script>

export default {
    name: 'Register',
    data() {
        return {
            username       : '',
            password       : '',
            confirmPassword: '',
            errorMessage   : '',
        };
    },
    methods: {
        tryToRegister() {
            if (this.password !== this.confirmPassword) return;
            if (this.password.length < 4) {
                this.errorMessage = 'Password must be longer than 4 characters';
                return;
            }
            this.$store.dispatch('register', {username: this.username, password: this.password})
                .then(result => result === true ? this.goToLogin() : (this.errorMessage = result));
        },
        goToLogin() {
            this.$router.push({name: 'login'});
        },
    },
    created() {
        if (this.$store.getters.isUserLogged()) this.$router.push({name: 'admin:home'});
    },
};
</script>

<style scoped>
.bad {
    border-color : red;
}
</style>
