const Utils = require('../utils/Utils');
const {
    fetchMovies,
} = require('../data/sources/MovieSource');

const getMovies = async (req, res) => {
    const movies = await fetchMovies();

    movies.sort(Utils.compareValues('release_date'));

    return res.status(200).send({
        movies,
    });
};

module.exports = {
    getMovies,
};
