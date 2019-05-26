const express = require('express');

const router = express.Router();
const MovieController = require('../controllers/MoviesController');
const CharactersController = require('../controllers/CharactersController');
const {
    catchErrors,
} = require('../handlers/ErrorHandler');

router.get('/movies',
    catchErrors(MovieController.getMovies));

router.get('characters',
    catchErrors(CharactersController.getCharacters));

module.exports = router;
