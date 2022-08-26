const express = require('express')
const mongoose = require('mongoose')

const Games = require('./models/schema.js')
const cors = require('cors')
const app = express()

//middleware///
app.use(express.json())
app.use(cors())

//create route///
app.post('/games', (req, res) => {
    Games.create(req.body, (err, createdGame) => {
        res.json(createdGame);
    })
})









app.listen(3000, () => {
    console.log('listening')
})

mongoose.connect('mongodb://localhost:27017/game')
mongoose.connection.once('open', ()=> {
    console.log('connect to mongod...')
})