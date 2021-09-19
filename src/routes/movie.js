const {
    getAllMovieHandler,
    createMovieHandler,
    updateMovieHandler,
    getMovieHandler,
    deleteMovieHandler } = require('../controllers/movie');
const express = require('express');
const router = express.Router();

router.get('/', getAllMovieHandler);
router.get('/:id', getMovieHandler);
router.post('/', createMovieHandler);
router.put('/:id', updateMovieHandler);
router.delete('/:id', deleteMovieHandler);

module.exports = router;