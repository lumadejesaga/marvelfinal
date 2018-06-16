const express = require('express')
const bodyParser = require('body-parser')
const {characters} = require('./data/characters')
const request = require('request');
const rp = require('request-promise')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.status(200).send("<h1>Match API!</h1>");
});

app.get("/next", (req, res) => {
    const options = {
        method: 'GET',
        uri: `https://gateway.marvel.com:443/v1/public/characters?ts=1525970598374&apikey=e4117629608434b50e4cb84d53b74b26&hash=7d519d32472a77711a3ec72771b03a51&limit=100`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true,
    }

    rp(options)
    .then(response => {
        let random = Math.floor(Math.random() * (100 - 0))
        let random2 =  Math.floor(Math.random() * (100 - 0))
                jsonResponse = {
                    id: response.data.results[random].id,
                    name: response.data.results[random].name,
                    description: response.data.results[random].description,
                    image: response.data.results[random].thumbnail.path +"."+ response.data.results[random2].thumbnail.extension
                }
                jsonResponse2 = {
                    id: response.data.results[random2].id,
                    name: response.data.results[random2].name,
                    description: response.data.results[random2].description,
                    image: response.data.results[random2].thumbnail.path +"."+ response.data.results[random2].thumbnail.extension
                }
                res.json(console.log(jsonResponse))
    })
    .catch(err => res.status(400).send("number no valid"))
});

app.post("/vote", (req, res) => {
    const {id} = req.body

    if (!id) {
        res.status(400).json({error: 'id is required'})
    } else {


        res.status(404).json({error: 'Object not found'})

    }
});


const newPort = process.env.PORT || 3000

app.listen(newPort, function () {
    console.log('Server listening on port: ' + newPort)
});