const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autofill = new Schema({
    movieList: {
        type: String
    }
});

const AutoFill = mongoose.model('Autofill', autofill);
module.exports = AutoFill;