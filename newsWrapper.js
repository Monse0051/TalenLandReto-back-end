const requestPromise = require('request-promise-native');
const firebase = require("firebase");

let firebaseConfig = {
    apiKey: "AIzaSyCxz9r4GYfptGIo_-t-Xbr7pe2rJMx6I_8",
    authDomain: "talentlandreto.firebaseapp.com",
    databaseURL: "https://talentlandreto.firebaseio.com",
    projectId: "talentlandreto",
    storageBucket: "talentlandreto.appspot.com",
    messagingSenderId: "131560048493",
    appId: "1:131560048493:web:a8be59036e94dddb153c64"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();

const API_KEY = "defd605d076d431b899e238f871195c3";

function getTodayNews(){
    let today = getDate()
    const options = {
        uri: `https://newsapi.org/v2/everything?q=bitcoin&from=${today}&apiKey=${API_KEY}`,
        json: true // Automatically parses the JSON string in the response
    };
    requestPromise.get(options)
        .then(resultNews => {
            //console.log(resultNews);
            saveTofirebase(resultNews);
            }
        ).catch(err => {
            console.log("error");
        });
}

function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    today = mm + '-' + dd + '-' + yyyy;

    return today;
}

function saveTofirebase(news){
    console.log("DEBUG_MSG: saving to firebase");
    let setDoc = db.collection('News').doc(`Bitcoins_${getDate()}`).set(news);
}

function getRandomNew(){

   return db.collection('News').doc(`Bitcoins_${getDate()}`).get()
  .then((newsRef) => {
    let newArticle;
    if (!newsRef.exists) {
        console.log("ERROR: Could not found saved news!");
        newArticle = {error: "Could not found news"};
    } else {
        console.log("printing news...");
        let newsRaw = newsRef.data();
        let articles = newsRaw.articles;
        let totalArticles = articles.length;
        const randomIndex = getRandom(totalArticles)
        newArticle = articles[randomIndex];
        console.log(newArticle);
    }
    return newArticle;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

} 
function getRandom(max) {
    return Math.floor(Math.random()*max);
  }


module.exports = {getTodayNews, getRandomNew};