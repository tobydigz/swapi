const Utils = require('../utils/Utils');
const {
    fetchMovies,
} = require('../utils/MovieUtils');

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
};
