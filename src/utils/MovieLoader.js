const {
    fetchMovies,
    storeMoviesInCache,
} = require('../data/sources/MovieSource');

const loadMovies = async () => {
    const movies = await fetchMovies(true);

    await storeMoviesInCache(movies);
};

module.exports = {
    loadMovies,
};
