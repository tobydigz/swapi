const {
    getCommentCounts,
} = require('./CommentUtils');

const mapMovies = (results) => {
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
    };
};


const addCommentCounts = async (movies, movieIds) => {
    const counts = await getCommentCounts(movieIds);
    counts.forEach((value, key) => {
        const movie = movies.get(key);
        if (movie) {
            movie.comment = value;
        }
    });
    return Array.from(movies.values());
};

module.exports = {
    mapMovies,
    addCommentCounts,
};
