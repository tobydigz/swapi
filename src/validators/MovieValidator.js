/* eslint-disable camelcase */
const NodeCache = require('node-cache-promise');
const {
    body,
} = require('express-validator/check');

const key = 'movies';

const cache = new NodeCache();

const getMovieIdsFromCache = async () => cache.get(key);

const storeMovieIdsInCache = async (movieIds) => {
    const originalIds = await getMovieIdsFromCache();
    if (originalIds) {
        movieIds.forEach((movieId) => {
            originalIds.add(movieId);
        });
        return cache.set(key, originalIds);
    }

    const ids = new Set(movieIds);

    return cache.set(key, ids);
};

const checkMovieId = body('movie_id')
    .exists()
    .custom(async (movie_id) => {
        const ids = await getMovieIdsFromCache();

        return ids.has(movie_id);
    }).withMessage('Invalid Movie ID supplied');

module.exports = {
    storeMovieIdsInCache,
    checkMovieId,
};
