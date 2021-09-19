const {
    getAllMovie,
    createMovie,
    findMovie,
    findAndUpdateMovie,
    deleteMovie
} = require('../services/movie');
const {
    successResponse,
    successResponseWithData,
    notFoundResponse,

} = require('../helpers/apiResponse');
const logger = require('../logger');

module.exports = {
    getAllMovieHandler: async function (req, res) {
        try {
            const movies = await getAllMovie();
            return successResponseWithData(res, 'Operation success', movies);
        } catch (error) {
            logger.error('ERROR | getAllMovieHandler', error.message);
            throw error;
        }
    },
    createMovieHandler: async function (req, res) {
        try {
            const body = req.body;

            const movie = await createMovie({ ...body });
            return successResponseWithData(res, 'Movie Created', movie);
        } catch (error) {
            logger.error('ERROR | createMovieHandler', error.message);
            throw error;
        }
    },
    updateMovieHandler: async function (req, res) {
        try {
            const _id = req.params.id;
            const update = req.body;
            const options = { new: true };

            const movie = await findMovie({ _id });
            if (!movie) {
                return notFoundResponse(res, 'Movie not found');
            }
            const updatedMovie = await findAndUpdateMovie({ _id }, update, options);
            return successResponseWithData(res, 'Movie updated successfully', updatedMovie);
        } catch (error) {
            logger.error('ERROR | updateMovieHandler', error.message);
            throw error;
        }
    },
    getMovieHandler: async function (req, res) {
        try {
            const _id = req.params.id;
            const movie = await findMovie({ _id });
            if (!movie) {
                return notFoundResponse(res, 'Movie not found');
            }
            return successResponseWithData(res, 'Operation success', movie);
        } catch (error) {
            logger.error('ERROR | getMovieHandler', error.message);
            throw error;
        }
    },
    deleteMovieHandler: async function (req, res) {
        try {
            const _id = req.params.id;
            const movie = await findMovie({ _id });
            if (!movie) {
                return notFoundResponse(res, 'Movie not found');
            }
            await deleteMovie({ _id });
            return successResponse(res, 'Movie deleted');
        } catch (error) {
            logger.error('ERROR | deleteMovieHandler', error.message);
            throw error;
        }
    }
}