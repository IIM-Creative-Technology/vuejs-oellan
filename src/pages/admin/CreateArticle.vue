<template>
    <main>
        <div :style="{'--back-image': 'url('+imageUrl+')'}"
             class="post-image"></div>
        <div class="content">
            <label>Title</label>
            <input v-model="title">
            <span>Slug: {{ slugOfTitle }}</span>
            <div>
                <h2>Metadata</h2>
                <label>Title</label>
                <input v-model="metaTitle">
                <label>Description</label>
                <input v-model="metaDescription">
                <label>Image URL</label>
                <input v-model="imageUrl">
                <hr>
            </div>
            <textarea v-model="body"></textarea>
            <div>
                <button class="save-button"
                        @click="savePost">Save
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import BlogPost from '@/models/BlogPost.js';
import slug     from 'slug';

export default {
    name: 'CreateArticle',
    data() {
        return {
            title          : '',
            metaTitle      : '',
            metaDescription: '',
            body           : '',
            imageUrl       : 'https://via.placeholder.com/900x450',
        };
    },
    computed: {
        slugOfTitle() {
            return slug(this.title);
        },
    },
    methods : {
        savePost() {
            if (
                this.title.length >= 4 &&
                this.metaDescription.length >= 10 &&
                this.metaTitle.length >= 4 &&
                this.body.length >= 10 &&
                this.imageUrl.length >= 10
            ) {
                this.$store.commit(
                    'savePost',
                    new BlogPost(
                        this.title,
                        this.metaTitle,
                        this.metaDescription,
                        this.body,
                        this.imageUrl,
                        this.$store.state.loggedUser.uuid,
                    ));
                this.$router.push({name: 'admin:home'});
            }
        },
    },
};
</script>

<style scoped>

</style>
