const request = require('../../utils/SwapiRequest');
const {
    mapMovie,
} = require('../../utils/MovieUtils');
const {
    getCommentCounts,
} = require('./CommentSource');
const {
    getAsync,
    setAsync,
} = require('../redis-client');

const movieKey = 'movies';

const fetchMovieFromApi = async (id) => {
    const path = `films/${id}`;
    return request.fetchData(path);
};

const fetchMovie = async (id) => {
    let movie = await getAsync(`${movieKey}-${id}`);

    if (movie) {
        return JSON.parse(movie);
    }
    const apiMovie = await fetchMovieFromApi(id);
    movie = mapMovie(apiMovie);
    setAsync(`${movieKey}-${id}`, JSON.stringify(movie));
    return movie;
};

const fetchMoviesFromApi = async () => {
    const path = 'films';
    const {
        results,
    } = await request.fetchData(path);

    return results;
};

const storeMovieIdsInCache = async (movieIds) => {
    let originalIds = await getAsync(movieKey);
    if (originalIds) {
        originalIds = JSON.parse(originalIds);
        const setMovieIds = new Set(originalIds);
        movieIds.forEach((movieId) => {
            setMovieIds.add(movieId);
        });
        return setAsync(movieKey, JSON.stringify(Array.from(setMovieIds)));
    }

    return setAsync(movieKey, JSON.stringify(movieIds));
};

const fetchMoviesFromCache = async () => {
    let movieIds = await getAsync(movieKey);

    if (!movieIds) {
        return null;
    }
    movieIds = JSON.parse(movieIds);

    const moviePromises = [];

    movieIds.forEach((id) => {
        moviePromises.push(fetchMovie(id));
    });

    return Promise.all(moviePromises);
};

const addCommentCounts = async (movies) => {
    const movieMap = new Map();
    movies.forEach((movie) => {
        movieMap.set(movie.id, movie);
    });
    const counts = await getCommentCounts(Array.from(movieMap.keys()));
    counts.forEach((value, key) => {
        const movie = movieMap.get(key);
        if (movie) {
            movie.comments = value;
        }
    });
    return movies;
};

const fetchMovies = async (moviesAlone = false) => {
    let movies = await fetchMoviesFromCache();

    if (!movies || movies.length < 1) {
        const results = await fetchMoviesFromApi();

        movies = results.map(mapMovie);
    }

    if (moviesAlone) {
        return movies;
    }

    movies = await addCommentCounts(movies);

    return movies;
};


const storeMoviesInCache = async (movies) => {
    const movieIds = movies.map(movie => movie.id);

    const promises = [];
    promises.push(storeMovieIdsInCache(movieIds));

    movies.forEach((movie) => {
        promises.push(setAsync(`${movieKey}-${movie.id}`, JSON.stringify(movie)));
    });

    await Promise.all(promises);
};

module.exports = {
    fetchMovies,
    storeMoviesInCache,
    fetchMovie,
};
