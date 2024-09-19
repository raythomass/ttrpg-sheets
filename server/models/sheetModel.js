const mongoose = require('mongoose');

const Schema = mongoose.Schema

const sheetSchema = new Schema({
    player_name: {
        type: String,
        required: true
    },
    character_name: {
        type: String,
        required: true
    },
    character_class: {
        type: String,
        required: true
    },
    level: {
        type: Number,
    }
})

module.exports = mongoose.model('Sheet', sheetSchema);