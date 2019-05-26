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

exports.getMovies = async (req, res) => {
    const {
        page,
        sort,
        order,
        filter,
    } = req.query;
    const path = 'people';

    const queryObject = {
        page,
    };

    const {
        results,
        next,
        previous,
    } = request.fetchData(path, queryObject);

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
        characters.push(character);
    });

    characters.sort(Utils.compareValues(sort, order));

    return res.status(200).send({
        characters: characters.filter(Utils.filterValues('gender', filter)),
        previous,
        next,
    });
};
