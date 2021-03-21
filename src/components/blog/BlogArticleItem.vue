<template>
    <article>
        <div :style="{'--back-image': 'url('+post.imageUrl+')'}"
             class="post-image"></div>
        <div class="content">
            <h1>{{ post.title }}</h1>
            <p>
                {{ truncateString(post.body, maxBodyShortLength) }}
                <router-link :to="{name: 'blog:article', params: {'slug': post.meta.slug}}">Read more...</router-link>
            </p>
        </div>
    </article>
</template>

<script>
import BlogPost         from '@/models/BlogPost.js';
import {truncateString} from '@/utils/string.js';

export default {
    name   : 'BlogArticleItem',
    props  : {
        post: BlogPost,
    },
    data   : () => {
        return {
            maxBodyShortLength: 80,
        };
    },
    methods: {
        truncateString,
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
