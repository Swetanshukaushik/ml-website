const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    movie1: {
        type: String,
        reqired: true
    },
    movie2: {
        type: String,
        required: true
    },
    movie3: {
        type : String,
        required: true
    }
}, { timestamps: true}); //automatically adds timestamps

const MovieSuggestor = mongoose.model('movieSuggestor', moviesSchema);
module.exports = MovieSuggestor;