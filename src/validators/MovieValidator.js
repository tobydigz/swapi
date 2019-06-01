const {
    body,
} = require('express-validator/check');

const {
    fetchMovie,
} = require('../data/sources/MovieSource');

const checkMovieId = body('movie_id')
    .exists()
    .custom(async (movie_id) => {
        const movie = await fetchMovie(movie_id);

        return !!movie;
    }).withMessage('Invalid Movie ID supplied');

module.exports = {
    checkMovieId,
};
