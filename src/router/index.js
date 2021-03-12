import {
    createRouter,
    createWebHistory,
} from 'vue-router';

const AdminHome     = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/Home.vue');
const CreateArticle = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/CreateArticle.vue');
const BlogHome      = () => import(/* webpackChunkName: "group-blog"  */ '@/pages/blog/Home.vue');
const BlogArticle   = () => import(/* webpackChunkName: "group-blog"  */ '@/pages/blog/BlogArticle.vue');
const Login         = () => import(/* webpackChunkName: "group-login" */ '@/pages/admin/Login.vue');

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes : [
        {
            name     : 'blog:home',
            path     : '/',
            component: BlogHome,
        },
        {
            name     : 'blog:article',
            path     : '/article/:slug',
            component: BlogArticle,
        },
        {
            name     : 'admin:home',
            path     : '/admin',
            component: AdminHome,
        },
        {
            name     : 'admin:article:create',
            path     : '/admin/create',
            component: CreateArticle,
        },
        {
            name     : 'login',
            path     : '/login',
            component: Login,
        },
    ],
});
