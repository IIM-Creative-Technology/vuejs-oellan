export default (store) => {

    /**
     * @param {Store} store
     * @param {RouteLocationNormalized} to
     * @param {RouteLocationNormalized} from
     * @param {NavigationGuardNext} next
     */
    return function (to, from, next) {
        if (to.matched.some(
            record => Object.prototype.hasOwnProperty.call(
                record.meta,
                'requiresAuth',
            ),
        )) {
            if (store.getters.isUserLogged() === true) {
                console.log('logged in');
                next();
            } else {
                console.log('need to log in -> redirect');
                next({name: 'login'});
            }
        } else {
            console.log('no need to log');
            next();
        }
    };
}
