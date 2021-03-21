class Artist {

    constructor() {
        throw new Error('Don\'t instantiate the Artist class');
    }

    /**
     * @param object
     * @return {boolean}
     */
    static isString(object) {
        return (typeof (object) === 'string' || object instanceof String);
    }

    /**
     * @param object
     * @return {boolean}
     */
    static isNull(object) {
        return object == null;
    }

    /**
     * @param object
     * @return {boolean}
     */
    static isArray(object) {
        return object instanceof Array;
    }

    /**
     * @param object
     * @return {boolean}
     */
    static isFunction(object) {
        return typeof (object) === 'function' || object instanceof Function;
    }

    /**
     * @param {function(*): boolean} predicate
     * @return {function(*): boolean}
     */
    static not(predicate) {
        return (object) => !predicate(object);
    }

    /**
     * @param object
     * @param {(function(*): boolean)[]} predicates
     * @return {boolean}
     */
    static isAny(object, predicates) {
        predicates = this.isArray(predicates) ? predicates : [];
        if (predicates.length === 0) return true;
        return predicates.some((predicate) => this.isFunction(predicate) ? predicate.call(null, object) : false);
    }
}

// eslint-disable-next-line no-prototype-builtins
if (window != null && !Boolean.prototype.hasOwnProperty('throwIfFalse')) {

    const DEFAULT_MESSAGE_TIF = 'Found false but true was needed';

    Boolean.prototype.throwIfFalse = function (message = DEFAULT_MESSAGE_TIF) {
        if (!Artist.isString(message)) message = DEFAULT_MESSAGE_TIF;
        if (this.valueOf() === false) throw new Error(message);
    };
}

export default Artist;
