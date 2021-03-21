<template>
    <article>
        <h1>{{ currentArticle.title }}</h1>
        <img :src="currentArticle.imageUrl"
             alt="Article Image"/>
        <pre>{{ currentArticle.body }}</pre>
        <div>Written by: {{ author.username }}</div>
    </article>
</template>

<script>
import BlogPost      from '@/models/BlogPost.js';
import DocumentUtils from '@/utils/document.js';

export default {
    name    : 'BlogArticle',
    props   : {
        currentArticle: BlogPost,
    },
    computed: {
        /**
         * @return {User}
         */
        author() {
            return this.$store.getters.getUserFromUUID(this.currentArticle.meta.authorUUID);
        },
    },
    created() {
        DocumentUtils.setPageTitle(this.$props.currentArticle.meta.title);
        DocumentUtils.setMetaDescription(this.$props.currentArticle.meta.description);
    },
};
</script>

<style>
.clear-both {
    clear : both;
}
</style>

<style scoped>

</style>
