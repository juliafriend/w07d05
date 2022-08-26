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

//index route
app.get('/games', (req, res)=>{
    Games.find({}, (err, foundGames)=>{
        res.json(foundGames);
    });
});

//delete route
app.delete('/games/:id', (req, res)=>{
    Games.findByIdAndRemove(req.params.id, (err, deletedGames)=>{
        res.json(deletedGames);
    });
});

//edit route
app.put('/todos/:id', (req, res)=>{
    Games.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedGame)=>{
        res.json(updatedGame);
    });
});

app.listen(3000, () => {
    console.log('listening')
})

mongoose.connect('mongodb://localhost:27017/game')
mongoose.connection.once('open', ()=> {
    console.log('connect to mongod...')
})