const {
    param,
} = require('express-validator/check');

const {
    fetchMovie,
} = require('../data/sources/MovieSource');

const checkMovieId = param('id')
    .exists()
    .custom(async (id) => {
        const movie = await fetchMovie(id);

        return !!movie;
    }).withMessage('Invalid Movie ID supplied');

module.exports = {
    checkMovieId,
};
