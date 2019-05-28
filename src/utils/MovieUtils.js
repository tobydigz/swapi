const request = require('./SwapiRequest');
const {
    getCommentCounts,
} = require('./CommentUtils');
const {
    getPageFromUrl,
} = require('./Utils');
const {
    storeMovieIdsInCache,
} = require('../validators/MovieValidator');


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

const fetchMovies = async (page, moviesAlone = false) => {
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

    await storeMovieIdsInCache(movieIds);

    let moviesArray;
    if (moviesAlone) {
        moviesArray = Array.from(movies.values());
    } else {
        moviesArray = await addCommentCounts(movies, movieIds);
    }

    return {
        movies: moviesArray,
        movieIds,
        next: getPageFromUrl(next),
        previous: getPageFromUrl(previous),
    };
};


module.exports = {
    fetchMovies,
};
