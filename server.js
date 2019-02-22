var express = require('express');
var db = require("./models");
var app = express();

app.use(express.urlencoded({extended: false}));

app.get('/movies', function(req,res) {
    db.movies.findAll().then(function(data) {
        res.json(data);
    });
});

app.post('/movies', function(req, res) {
    db.movies.create({
        title: req.body.title,
        year: parseInt(req.body.year),
        genre: req.body.genre
    }).then(function(data) {
        res.json(data);
    });
});

app.get('/movies/:id', function(req,res) {
    db.movies.findById(parseInt(req.params.id)).then(function(data) {
        res.json(data);
    });
});

app.delete('/movies/:id', function(req,res) {
    db.movies.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.redirect("/movies");
    });
});

app.get('/movies/:id/edit', function(req,res) {
    db.movies.findById(parseInt(req.params.id)).then(function(data) {
        res.json(data);
    });
});

app.put('/movies/:id', function(req,res) {
    db.movies.update({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre 
    }, {
        where: {
            id: parseInt(req.params.id)
    }

    }).then(function(data) {
        res.redirect("/movies/" + parseInt(req.params.id));
    });
});

app.listen(3000);
