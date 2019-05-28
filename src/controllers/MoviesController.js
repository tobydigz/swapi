/* eslint-disable camelcase */
const Utils = require('../utils/Utils');
const request = require('../utils/SwapiRequest');
const {
    mapMovies,
    addCommentCounts,
} = require('../utils/MovieUtils');

const getMovies = async (req, res) => {
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
    } = await request.fetchData(path, queryObject);

    const {
        movies,
        movieIds,
    } = mapMovies(results);

    const moviesArray = addCommentCounts(movies, movieIds);
    moviesArray.sort(Utils.compareValues('release_date'));

    return res.status(200).send({
        previous: Utils.getPageFromUrl(previous),
        next: Utils.getPageFromUrl(next),
        movies: moviesArray,
    });
};

module.exports = {
    getMovies,
};
