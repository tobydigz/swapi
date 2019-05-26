const express = require('express');

const router = express.Router();
const MovieController = require('../controllers/MoviesController');
const CharactersController = require('../controllers/CharactersController');
const ErrorController = require('../controllers/ErrorController');
const validators = require('../validators/InputValidators');
const {
    catchErrors,
} = require('../handlers/ErrorHandler');

router.get('/movies',
    [
        validators.checkPage,
    ],
    ErrorController.handle,
    catchErrors(MovieController.getMovies));

router.get('/characters',
    [
        validators.checkPage,
        validators.checkFilter,
        validators.checkSort,
        validators.checkOrder,
    ],
    ErrorController.handle,
    catchErrors(CharactersController.getCharacters));

module.exports = router;
