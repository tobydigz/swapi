/* eslint-disable camelcase */
const request = require('../utils/SwapiRequest');
const Utils = require('../utils/Utils');

exports.getMovies = async (req, res) => {
    const {
        page,
    } = req.query;
    const path = 'films';
    const queryObject = {
        page,
    };
    const {
        results,
        next,
        previous,
    } = request.fetchData(path, queryObject);

    const movies = [];

    results.forEach((result) => {
        const {
            title,
            episode_id: id,
            opening_crawl,
            release_date,
        } = result;
        const movie = {
            id,
            title,
            opening_crawl,
            release_date,
        };
        movies.push(movie);
    });

    movies.sort(Utils.compareValues('release_date'));

    return res.status(200).send({
        movies,
        previous,
        next,
    });
};
