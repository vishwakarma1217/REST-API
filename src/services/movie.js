const Movie = require('../models/movie');

module.exports = {
    getAllMovie: function () {
        return Movie.find({});
    },
    createMovie: function (query) {
        return Movie.create(query);
    },
    findMovie: function (query) {
        return Movie.findOne(query);
    },
    findAndUpdateMovie: function (query, update, options) {
        return Movie.findOneAndUpdate(query, update, options);
    },
    deleteMovie: function (query) {
        return Movie.deleteOne(query);
    }
}
