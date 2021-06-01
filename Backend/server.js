'use strict';
// require packages

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const superagent = require('superagent');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

mongoose.connect(
    'mongodb://localhost:27017/getCharacters'
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.use(cors());
app.use(express.json());

////////////////

// API proof of life
app.get('/', (req, res) => {
    res.send('everything is working!')
});


// making constructure

class Game {
    constructor(dataGame) {
        this.name = dataGame.name;
        this.gender = dataGame.gender;
        this.img = dataGame.img;
        this.psiPowers = dataGame.psiPowers.name
    }
}

// getting API data
app.get('/getCharacters', (req, res) => {
    const url = `https://psychonauts-api.herokuapp.com/api/characters?limit=10`;
    superagent.get(url).then(data => {
        const newItem = data.body.map(element => new Game(element))
        res.send(newItem)
    }).catch()
});


// formating schema 

const Characters = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    gender: String,
    img: String,
    psiPowers: String
});

// modeling the schema

const MyModel = mongoose.model('ModelCharacters', Characters);

// creating CRDU operations 

// 1-getting favorite saved data

app.get('/getCharacters/favorite', (req, res) => {
    MyModel.find({}, (err, data) => {
        res.send(data)
    })
});

// 2-adding new favorite items

app.post('/getCharacters/favorite', (req, res) => {
    const { name, gender, psiPowers } = req.body;
    const slug = name.split(' ').join('_');
    MyModel.find({ slug: slug }, (err, data) => {
        if (data.length > 0) {
            res.send('it is existed');
        } else {
            const newGame = new MyModel({
                name: name, gender: gender, psiPowers: psiPowers , slug:slug
            })
            newGame.save();
            res.send(newGame)
        }
    })
});

// 3-deleting saved items in favorite page

app.delete('/getCharacters/favorite/:slug', (req, res) => {
    const slug = req.params.slug;
    MyModel.remove({ slug: slug }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            MyModel.find({}, (err, data) => {
                res.send(data)
            })
        }
    })
});


// 4-updating saved items in favorite page
app.put('/getCharacters/favorite/:slug', (req, res) => {
    const slug = req.params.slug;
    const { name, gender } = req.body;
    MyModel.find({ slug: slug }, (err, data) => {
        if (err) {
            res.send(err)
        }else{
            data[0].name = name ;
            data[0].gender = gender ;
            data[0].save();
            res.send(data)
        }
    })
});


////////////////

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});