const request = require('request-promise-native');
const config = require('config');

const {
    SWAPI_URL: endpoint,
} = config;

const fetchData = async (path, queryObject) => {
    const options = {
        uri: `${endpoint}/${path}`,
        method: 'GET',
        qs: queryObject,
        simple: true,
        json: true,
    };
    return request(options);
};

module.exports = {
    fetchData,
};
