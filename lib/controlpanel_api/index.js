const fetch = require('node-fetch');

/**
 * 
 * @param {String} [slug]
 * @param {String|Number} [value]
 * @returns 
 */
const GetUsers = (slug, value) => {
    return new Promise((resolve, reject) => {
        let url_filter = "";
        if (slug && value) {
            url_filter = `?filter[${slug}]=${value}`
        }
        const url = `${process.env.controlpanel_url}api/users${url_filter}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': process.env.application,
                'Authorization': `Bearer ${process.env.controlpanel_api_key}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const IncrementUser = (id, credits, server_limit) => {
    return new Promise((resolve, reject) => {
        const url = `${process.env.controlpanel_url}api/users/${id}/increment`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'User-Agent': process.env.application,
                'Authorization': `Bearer ${process.env.controlpanel_api_key}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ credits: credits, server_limit: server_limit })
        })
            .then(response => response.json())
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = {
    GetUsers,
    IncrementUser
}