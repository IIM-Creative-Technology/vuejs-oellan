<template>
    <article>
        <div :style="{'--back-image': 'url('+post.imageUrl+')'}"
             class="post-image"></div>
        <div class="content">
            <h1>{{ post.title }}</h1>
            <div v-if="editMode">
                <h2>Metadata</h2>
                <label>Title</label>
                <input v-model="post.meta.title">
                <label>Description</label>
                <input v-model="post.meta.description">
                <label>Image URL</label>
                <input v-model="post.imageUrl">
                <hr>
            </div>
            <p v-if="!editMode">
                {{ truncateString(post.body, maxBodyShortLength) }}
            </p>
            <textarea v-else
                      v-model="post.body"></textarea>
            <div>
                <button v-if="editMode"
                        class="save-button"
                        @click="savePost">Save
                </button>
                <button v-else
                        class="edit-button"
                        @click="editMode = !editMode">Edit
                </button>
                <button class="delete-button">Delete</button>
            </div>
        </div>
    </article>
</template>

<script>
import {truncateString} from '@/utils/string.js';

export default {
    name    : 'AdminBlogArticleItem',
    props   : ['slug'],
    data    : () => {
        return {
            maxBodyShortLength: 80,
            editMode          : false,
        };
    },
    computed: {
        /**
         * @return {BlogPost}
         */
        post() {
            return this.$store.getters.getBlogPostFromSlug(this.slug);
        },
    },
    methods : {
        truncateString,
        savePost() {
            this.$store.commit('savePost', this.post);
            this.editMode = !this.editMode;
        },
    },
};
</script>

<style scoped>
article {
    display        : flex;
    flex-direction : row;
}

.content {
    flex         : 1 0;
    padding-left : 1rem;
}

/*noinspection CssUnresolvedCustomProperty*/
.post-image {

    width               : 10rem;
    height              : 10rem;
    background-image    : var(--back-image);
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : cover;
}
</style>
