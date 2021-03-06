import {createRouter, createWebHistory} from 'vue-router';

const routes = [];

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
