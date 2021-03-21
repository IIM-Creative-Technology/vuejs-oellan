import BlogPost      from '@/models/BlogPost.js';
import User          from '@/models/User.js';
import {createStore} from 'vuex';

const DEFAULT_USER     = new User(
    'admin',
    'admin',
);
const UNKNOWN_USER     = new User(
    'Unknown user',
    '',
    '0',
);
const DEFAULT_BLOGPOST = new BlogPost(
    'Default Post',
    'Default Post',
    'An example blog post',
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed neque convallis, scelerisque nisl et, rutrum ante.
Vivamus tempor egestas luctus. Donec ultrices neque porttitor feugiat convallis. Curabitur eu commodo
Pellentesque malesuada id diam sed rhoncus. Vestibulum blandit, urna ac tempus rutrum, velit velit finibus enim, vitae sodales risus mauris eget ex.
Proin venenatis commodo venenatis. Suspendisse sed finibus libero. Vestibulum vehicula posuere ultrices.
Maecenas gravida egestas libero, quis tincidunt magna tincidunt in. Ut auctor sem eget nisl viverra euismod.`,
    'https://via.placeholder.com/900x450',
    DEFAULT_USER.uuid,
);

export default createStore({
    state    : {
        /** @type {BlogPost[]} */
        blogPosts: [DEFAULT_BLOGPOST],

        /** @type {User[]} */
        users: [DEFAULT_USER],

        /** @type {User|null} */
        loggedUser: null,
    },
    mutations: {
        logout(state) {
            state.loggedUser = null;
        },
        login(state, user) {
            state.loggedUser = user;
        },
        register(state, {username, password}) {
            state.users.push(new User(username, password));
        },
        savePost(state, post) {
            let actualIndex;
            if ((actualIndex = state.blogPosts.findIndex(existingPost => existingPost.meta.slug === post.meta.slug)) !== -1) {
                state.blogPosts[actualIndex] = post;
            } else {
                state.blogPosts.push(post);
            }
        },
    },
    actions  : {
        logout({commit, getters}) {
            if (!getters.isUserLogged())
                commit('logout');
        },
        /**
         * @param commit
         * @param getters
         * @param {{username: string, password: string}} credentials
         */
        login({commit, getters}, credentials) {
            /** @type {User} */
            let actualUser;
            if ((actualUser = getters.getUserFromUsername(credentials.username)) !== UNKNOWN_USER
                && actualUser.password === credentials.password
            ) {
                commit('login', actualUser);
                return true;
            }
            return false;
        },
        /**
         * @param commit
         * @param getters
         * @param {{username: string, password: string}} credentials
         */
        register({commit, getters}, credentials) {
            if (getters.getUserFromUsername(credentials.username) === UNKNOWN_USER) {
                commit('register', credentials);
                return true;
            } else {
                return `User with name '${credentials.username}' already exists`;
            }
        },
    },
    getters  : {
        getBlogPostFromSlug: (state) =>
            (slug) => {
                return state.blogPosts.find(blogPost => blogPost.meta.slug === slug) || null;
            },
        getUserFromUUID    : (state) =>
            (uuid) => {
                /** @type {User|UNKNOWN_USER} */
                return state.users.find(user => user.uuid === uuid) || UNKNOWN_USER;
            },
        getUserFromUsername: (state) =>
            (username) => {
                /** @type {User|UNKNOWN_USER} */
                return state.users.find(user => user.username === username) || UNKNOWN_USER;
            },
        isUserLogged       : (state) =>
            () => {
                /** @type {boolean} */
                return state.loggedUser != null && state.users.find(user => user.uuid === state.loggedUser.uuid) != null;
            },
    },
});
