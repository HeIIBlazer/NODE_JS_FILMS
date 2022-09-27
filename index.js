const express = require('express');
const app = express();
const db = require('./mysql_connect')
 

app.get('/categories', (req, res) =>{
    db.query('SELECT * FROM category', (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 1 -------------
app.get('/film/title', (req, res) =>{
    db.query('SELECT title FROM film', (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 2 -------------

app.get('/actor_10', (req, res) =>{
    db.query('SELECT actor_id, first_name, last_name FROM actor WHERE actor_id <= 10 ORDER BY first_name', (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 3 --------------------

app.get('/film/title/:genre', (req, res) =>{
    const genre = req.params.genre;
    db.query('SELECT title FROM film INNER JOIN film_category USING(film_id) INNER JOIN category USING(category_id) WHERE name = ? ORDER BY title', genre, (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 4 --------------------

app.get('/film/actor/:id', (req, res) =>{
    const id = req.params.id;
    db.query('SELECT title FROM film INNER JOIN film_actor USING(film_id) INNER JOIN actor USING(actor_id) WHERE actor_id = ?', id, (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 5 --------------------

app.get('/film/actors/:last_name', (req, res) =>{
    const last_name = req.params.last_name;
    db.query('SELECT title FROM film INNER JOIN film_actor USING(film_id) INNER JOIN actor USING(actor_id) WHERE last_name = ?', last_name, (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 6 --------------------

app.get('/film/actors_by/:letters', (req, res) =>{
    const letters = req.params.letters;
    db.query('SELECT title FROM film INNER JOIN film_actor USING(film_id) INNER JOIN actor USING(actor_id) WHERE last_name LIKE ?',[`%${letters}%`], (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

//------------------- 7 --------------------

app.get('/film/genre', (req, res) =>{
    db.query('SELECT name, COUNT(film.film_id) FROM category INNER JOIN film_category USING(category_id) INNER JOIN film USING(film_id) GROUP BY name ORDER BY name', (error, result) => {
        if (error) throw error;
        return res.send({data: result});
    });
});

app.listen(3000)