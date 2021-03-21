/**
 * @param {string} text      The text to truncate if longer than the maxLength parameter
 * @param {number} maxLength The maximum length
 * @return {string}          The truncated string if longer than the max length and the original text if shorter or
 *                           equal in length.
 */
export function truncateString(text, maxLength) {
    if (maxLength <= 0) return '';

    return text.length <= maxLength ? text : (text.slice(0, maxLength - 3).concat('...'));
}
