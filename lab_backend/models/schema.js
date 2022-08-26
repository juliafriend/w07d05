const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: String,
    players: String,
    image: String,
    description: String
})

const Games = mongoose.model('Game', gameSchema)

module.exports = Games