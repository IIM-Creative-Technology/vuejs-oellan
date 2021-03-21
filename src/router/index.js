import isAuthed from '@/router/isAuthed.js';
import {
    createRouter,
    createWebHistory,
}               from 'vue-router';

const AdminHome     = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/Home.vue');
const CreateArticle = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/CreateArticle.vue');
const BlogHome      = () => import(/* webpackChunkName: "group-blog"  */ '@/pages/blog/Home.vue');
const BlogArticle   = () => import(/* webpackChunkName: "group-blog"  */ '@/pages/blog/BlogArticle.vue');
const Login         = () => import(/* webpackChunkName: "group-auth" */ '@/pages/admin/Login.vue');
const Register      = () => import(/* webpackChunkName: "group-auth" */ '@/pages/admin/Register.vue');

/**
 * @param {Store} store
 * @return {*}
 */
const routerFactory = (store) => {
    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes : [
            {
                name     : 'blog:home',
                path     : '/',
                component: BlogHome,
            },
            {
                name       : 'blog:article',
                path       : '/article/:slug',
                component  : BlogArticle,
                props      : (route) => ({
                    currentArticle: store.getters.getBlogPostFromSlug(route.params.slug),
                }),
                beforeEnter: (to, from, next) => {
                    let slug;
                    if (!Object.prototype.hasOwnProperty.call(to.params, 'slug')
                        || (slug = to.params.slug).trim().length === 0) {
                        next('/');
                    } else {
                        if (store.getters.getBlogPostFromSlug(slug) != null) {
                            next();
                        } else {
                            next('/');
                        }
                    }
                },
            },
            {
                name     : 'admin:home',
                path     : '/admin',
                component: AdminHome,
                meta     : {
                    requiresAuth: true,
                },
            },
            {
                name     : 'admin:article:create',
                path     : '/admin/create',
                component: CreateArticle,
                meta     : {
                    requiresAuth: true,
                },
            },
            {
                name     : 'login',
                path     : '/login',
                component: Login,
            },
            {
                name     : 'register',
                path     : '/register',
                component: Register,
            },

            /*
             * This route acts as a 404 catcher
             */
            {
                path    : '/:catchAll(.*)',
                redirect: '/',
            },
        ],
    });

    router.beforeEach(isAuthed(store));

    return router;
};


export default routerFactory;
