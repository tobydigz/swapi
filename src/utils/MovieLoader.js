const {
    fetchMovies,
} = require('./MovieUtils');

const loadMovies = async (page) => {
    const {
        next,
    } = await fetchMovies(page, true);

    if (next) {
        await loadMovies(next);
    }
};

module.exports = {
    loadMovies,
};
