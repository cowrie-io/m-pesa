const https = require('https');

/**
 * Makes a HTTP request depending on the runtime environment
 * @param {string} method
 * @param {string} URL
 * @param {string} params
 * @param {string} headers
 * @param {string} body
 */
export default async (method, URL, params, headers, body) => {
    const requestURL = URL.trim();
    const requestMethod = method.trim().toUpperCase();
    const requestPayload = JSON.stringify(body);
    const queryString = Object.keys(params).reduce((sigma, x) => sigma+=`${x}=${params[x]}&`, '').slice(0, -1);

    if (typeof fetch === 'function') {
        const resource = `${requestURL}?${queryString}`;
        const options = {method: requestMethod, headers: headers, body: requestPayload};

        const data = await fetch(resource, options);
        const response = await data.json();

        return response;
    }

    const resource = new URL(`${requestURL}?${queryString}`);
    const options = {hostname: resource.hostname, path: resource.pathname, method: requestMethod, headers: headers};
    https
        .request(options, (response) => {
            let data;

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                return JSON.parse(data);
            });
        })
        .on('error', (error) => {
            throw error;
        })
        .write(requestPayload)
        .end();
};
