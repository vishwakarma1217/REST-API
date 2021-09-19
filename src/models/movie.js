const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    summary: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Movie',MovieSchema);