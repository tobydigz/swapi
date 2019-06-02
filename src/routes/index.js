const express = require('express');

const router = express.Router();
const MovieController = require('../controllers/MoviesController');
const CharactersController = require('../controllers/CharactersController');
const CommentsController = require('../controllers/CommentController');
const ErrorController = require('../controllers/ErrorController');
const validators = require('../validators/InputValidators');
const movieValidators = require('../validators/MovieValidator');
const {
    catchErrors,
} = require('../handlers/ErrorHandler');

router.get('/movies',
    ErrorController.handle,
    catchErrors(MovieController.getMovies));

router.get('/movies/:id/characters',
    [
        validators.checkFilter,
        validators.checkSort,
        validators.checkOrder,
    ],
    ErrorController.handle,
    catchErrors(CharactersController.getCharacters));

router.get('/movies/:id/comments',
    [
        validators.checkLimit,
        validators.checkOffset,
    ],
    ErrorController.handle,
    catchErrors(CommentsController.getCommentsForMovie));

router.post('/movies/:id/comments',
    [
        validators.checkContent,
        movieValidators.checkMovieId,
    ],
    ErrorController.handle,
    catchErrors(CommentsController.postComment));


module.exports = router;
