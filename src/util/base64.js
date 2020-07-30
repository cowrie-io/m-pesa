/**
 * Base64 encodes a string depending on the runtime environment
 * @param {string} str
 * @return {string}
 */
const encode = (str = '') => {
    if (typeof btoa === 'function') {
        return btoa(str);
    }

    if (typeof Buffer === 'function') {
        return Buffer.from(str, 'utf-8').toString('base64');
    }

    throw new ReferenceError('Expected a native support for string encoding, none found');
};

/**
 * Base64 decodes a string depending on the runtime environment
 * @param {string} str
 * @return {string}
 */
const decode = (str = '') => {
    if (typeof atob === 'function') {
        return atob(str);
    }

    if (typeof Buffer === 'function') {
        return Buffer.from(str, 'base64').toString('utf-8');
    }

    throw new ReferenceError('Expected a native support for string encoding, none found');
};


export {
    encode,
    decode,
};
