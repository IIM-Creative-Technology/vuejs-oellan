<template>
    <BlogArticleItem v-for="post in allPosts"
                     :key="post.meta.slug"
                     :post="post"/>
</template>

<script>

import BlogArticleItem from '@/components/blog/BlogArticleItem.vue';
import DocumentUtils   from '@/utils/document.js';

export default {
    name      : 'BlogHome',
    components: {BlogArticleItem},
    computed  : {
        /** @returns {BlogPost[]} */
        allPosts() {
            return this.$store.state.blogPosts;
        },
    },
    created() {
        DocumentUtils.setPageTitle();
        DocumentUtils.setMetaDescription();
    },
};
</script>

<style scoped>

</style>
