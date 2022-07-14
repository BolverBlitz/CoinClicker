const fetch = require('node-fetch');

/**
 * 
 * @param {String} slug 
 * @param {String|Number} value 
 * @returns 
 */
const GetUsers = async (slug, value) => {
    const url = `https://api.github.com/users/${slug}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}