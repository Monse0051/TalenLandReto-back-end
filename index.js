const getRandomNew = require('./newsWrapper');
const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());


app.get('/', function (req, res) {

    getRandomNew().then(article => {
        res.send(article);
    });
  })
   
  app.listen(3000)