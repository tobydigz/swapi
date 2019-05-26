/* eslint-disable camelcase */
const request = require('../utils/SwapiRequest');
const Utils = require('../utils/Utils');

const resolveGender = (gender) => {
    if (gender.toLowerCase() === 'male') {
        return 'male';
    }
    if (gender.toLowerCase() === 'female') {
        return 'female';
    }
    return null;
};

exports.getCharacters = async (req, res) => {
    const {
        page,
        sort,
        order,
        filter,
    } = req.query;
    const shouldFilter = !!filter;
    const path = 'people';

    const queryObject = {
        page,
    };

    const {
        results,
        next,
        previous,
    } = await request.fetchData(path, queryObject);

    const characters = [];

    results.forEach((result) => {
        const {
            name,
            url,
            height,
            mass,
            gender,
        } = result;
        const character = {
            name,
            id: Utils.cleanSwapiUrl(url),
            height,
            mass,
            gender: resolveGender(gender),
        };
        if (Utils.filterCharacterByGender(filter, shouldFilter, character)) {
            characters.push(character);
        }
    });

    characters.sort(Utils.compareValues(sort, order));

    return res.status(200).send({
        previous: Utils.getPageFromUrl(previous),
        next: Utils.getPageFromUrl(next),
        count: characters.length,
        characters,
    });
};
