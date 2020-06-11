const mongoose = require('mongoose');
// const { Schema, model} = require ('mongoose');

const Movies = new mongoose.Schema({
    movieName: { type: String, required: true},
    actor: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rating: { type: String, required: true},
    stream: { type: String, required: true }
})
//schema vs model
module.exports = mongoose.model('movies', Movies);