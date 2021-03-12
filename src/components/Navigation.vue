<template>
    <nav>
        <router-link :to="{name: 'blog:home'}">Go to blog</router-link>
        |
        <router-link :to="{name: 'admin:home'}">Admin</router-link>
    </nav>
</template>

<script>
export default {
    name: 'Navigation',
};
</script>

<style scoped>

</style>
