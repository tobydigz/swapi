const request = require('request-promise-native');

const endpoint = process.env.SWAPI_URL || 'https://swapi.co/api';

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
