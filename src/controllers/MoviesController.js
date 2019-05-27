/* eslint-disable camelcase */
const request = require('../utils/SwapiRequest');
const Utils = require('../utils/Utils');
const {
    getCommentCounts,
} = require('./CommentController');

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

    const movies = new Map();
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
            comment: 0,
        };
        movies.set(id, movie);
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
        movieIds,
        next,
        previous,
    } = await fetchMovies(page);

    const counts = await getCommentCounts(movieIds);
    counts.forEach((value, key) => {
        const movie = movies.get(key);
        if (movie) {
            movie.comment = value;
        }
    });
    const moviesArray = Array.from(movies.values());
    moviesArray.sort(Utils.compareValues('release_date'));

    return res.status(200).send({
        previous,
        next,
        movies: moviesArray,
    });
};

module.exports = {
    getMovies,
    fetchMovies,
};
