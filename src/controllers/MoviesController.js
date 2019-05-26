/* eslint-disable camelcase */
const request = require('../utils/SwapiRequest');
const Utils = require('../utils/Utils');

const fetchMovies = async (page) => {
    const path = 'films';
    const queryObject = {
        page,
    };
    const {
        results,
        next,
        previous,
    } = await request.fetchData(path, queryObject);

    const movies = [];
    const movieIds = [];

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
        movieIds.push(id);
    });

    return {
        movies,
        movieIds,
        previous: Utils.getPageFromUrl(previous),
        next: Utils.getPageFromUrl(next),
    };
};

const getMovies = async (req, res) => {
    const {
        page,
    } = req.query;

    const {
        movies,
        next,
        previous,
    } = await fetchMovies(page);

    movies.sort(Utils.compareValues('release_date'));

    return res.status(200).send({
        previous,
        next,
        movies,
    });
};

module.exports = {
    getMovies,
    fetchMovies,
};
