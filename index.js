const {getTodayNews, getRandomNew} = require('./newsWrapper');
const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const DAY_MILISECONDS = 1000 * 60 * 60 * 24;
const HALF_DAY_MILISECONDS = DAY_MILISECONDS/2;

setInterval(getTodayNews, HALF_DAY_MILISECONDS);

app.get('/', function (req, res) {

    getRandomNew().then(article => {
        res.send(article);
    });
  });
   
app.listen(process.env.PORT || 8080);