const {
    fetchMovies,
} = require('../controllers/MoviesController');

const {
    storeMovieIdsInCache,
} = require('../validators/MovieValidator');

const loadMovies = async (page) => {
    const {
        movieIds,
        next,
    } = await fetchMovies(page);

    await storeMovieIdsInCache(movieIds);

    if (next) {
        await loadMovies(next);
    }
};

module.exports = {
    loadMovies,
};
