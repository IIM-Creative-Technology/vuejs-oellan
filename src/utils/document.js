import Artist from '@/utils/artist.js';

/**
 * @param {string|null} title
 */
export function setPageTitle(title = null) {
    if (
        Artist.isAny(
            title,
            [
                Artist.not(Artist.isString),
                Artist.isNull,
            ],
        )
    ) {
        title = 'A small CMS in VueJS';
    }
    document.querySelector('head title').textContent = title;
}

/**
 * @param {string|null} description
 */
export function setMetaDescription(description = '') {
    if (
        Artist.isAny(
            description,
            [
                Artist.not(Artist.isString),
                Artist.isNull,
            ],
        )
    ) {
        description = 'A small CMS in VueJS';
    }
    document.querySelector('head meta[name="description"]').setAttribute('content', description);
}

export default {
    setPageTitle,
    setMetaDescription,
};
