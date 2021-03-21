import Artist            from '@/utils/artist.js';
import {v4 as genUUIDv4} from 'uuid';

// eslint-disable-next-line no-unused-vars
export default class User {

    /**
     * @param {string} username
     * @param {string} password
     * @param {string|null} uuid
     */
    constructor(username, password, uuid = null) {

        Artist.isString(username).throwIfFalse('\'User.<init>.username\' isn\'t a string');
        Artist.isString(password).throwIfFalse('\'User.<init>.password\' isn\'t a string');
        Artist.isAny(uuid, [Artist.isString, Artist.isNull]).throwIfFalse('\'User.<init>.uuid\' isn\'t a nullable string');

        /** @type {string} */
        this.uuid = uuid == null ? genUUIDv4() : uuid;

        /** @type {string} */
        this.username = username;

        /** @type {string} */
        this.password = password;

        /** @type {boolean} */
        this.can_login = password.length !== 0;
    }
}
