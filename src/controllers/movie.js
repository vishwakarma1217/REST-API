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

module.exports = {
    getAllMovieHandler: async function (req, res) {
        const movies = await getAllMovie();
        return successResponseWithData(res,'Operation success', movies);
    },
    createMovieHandler: async function (req, res) {
        const body = req.body;

        const movie = await createMovie({ ...body });
        return successResponseWithData(res, 'Movie Created', movie);
    },
    updateMovieHandler: async function (req, res) {
        const _id = req.params.id;
        const update = req.body;
        const options = { new: true };

        const movie = await findMovie({ _id });
        if (!movie) {
            return notFoundResponse(res, 'Movie not found');
        }
        const updatedMovie = await findAndUpdateMovie({ _id }, update, options);
        return successResponseWithData(res,'Movie updated successfully', updatedMovie);
    },
    getMovieHandler: async function (req, res) {
        const _id = req.params.id;
        const movie = await findMovie({ _id });
        if (!movie) {
            return notFoundResponse(res, 'Movie not found');
        }
        return successResponseWithData(res,'Operation success', movie);
    },
    deleteMovieHandler: async function (req, res) {
        const _id = req.params.id;
        const movie = await findMovie({ _id });
        if (!movie) {
            return notFoundResponse(res, 'Movie not found');
        }
        await deleteMovie({ _id });
        return successResponse(res, 'Movie deleted');;
    }
}