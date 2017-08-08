var express = require('express');
var parser = require('body-parser');
var app = express();
var path = require("path");
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/mongo_api", function(err, database){
  if(err) return console.log(err);
  db = database;
  console.log('Connected to database');
  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/build');
});

app.post('/scales', (req, res) => {
  db.collection('scales').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database');
  res.redirect('/');
  })
});

app.get('/scales', function(req, res){
  db.collection('scales').find().toArray(function(err, results){
    res.json(results);
  });
});

app.post('/delete', function(req, res){
  db.collection('scales').remove({}); // removes all objects
  res.redirect('/');
})


// app.put('/:id', function(req, res) {
//   var film = new Film({
//     title: req.body.title,
//     actors: req.body.actors
//   });
//   films[req.params.id] = film;
//   res.json({data: films});
// });