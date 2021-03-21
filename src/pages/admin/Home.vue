<template>
    <router-link :to="{name: 'admin:article:create'}">Create a new post</router-link>
    <AdminBlogArticleItem v-for="post in allPosts"
                          :key="post.meta.slug"
                          :slug="post.meta.slug"></AdminBlogArticleItem>
</template>

<script>

import AdminBlogArticleItem from '@/components/admin/AdminBlogArticleItem.vue';
import DocumentUtils        from '@/utils/document.js';

export default {
    name      : 'AdminHome',
    components: {AdminBlogArticleItem},
    computed  : {
        /** @returns {BlogPost[]} */
        allPosts() {
            return this.$store.state.blogPosts;
        },
    },
    created() {
        DocumentUtils.setPageTitle('Administration');
        DocumentUtils.setMetaDescription();
    },
};
</script>

<style scoped>

</style>
