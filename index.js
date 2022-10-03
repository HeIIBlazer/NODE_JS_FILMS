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

app.use(express.json());
app.post('/category-add', (req, res) => {
    const category_info = req.body;
    db.query('INSERT INTO category SET ?',category_info, (error, result) => {
        if (error) throw error;
        res.status(201).send(`Category added with ID: ${result.insertId}`);
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

//------------------- МЕТОДЫ --------------

app.use(express.json());
app.post('/actor-add', (req, res) => {
    const actor_info = req.body;
    db.query('INSERT INTO actor SET ?',actor_info, (error, result) => {
        if (error) throw error;
        res.status(201).send(`Actor added with ID: ${result.insertId}`);
    });
}); 


app.put('/actor-update/:id', (req, res) => {
    const id = req.params.id;
    db.query('UPDATE actor SET ? WHERE actor_id = ?',[req.body, id], (error) => {
        if (error) throw error;
        res.status(200).send(`Actor with ${id} updated successfully!`);
    });
}); 

app.delete('/actor-delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM actor WHERE actor_id = ?',id, (error) => {
        if (error) throw error;
        res.status(200).send(`Actor with ${id} deleted successfully!`);
    });
}); 

//------------------- МЕТОДЫ для фильмов --------------

// "title":"DANIEL MONJANE",
// "description":"LALALALALl",
// "release_year":"2008",
// "language_id":"1",
// "rental_duration":"5",
// "rental_rate":"4.88",
// "length":"91",
// "replacement_cost":"20.99",
// "rating":"PG"


app.post('/film-add', (req, res) => {
    const film_info = req.body;
    db.query('INSERT INTO film SET ?',film_info, (error, result) => {
        if (error) throw error;
        res.status(201).send(`Film added with ID: ${result.insertId}`);
    });
}); 


app.put('/film-update/:id', (req, res) => {
    const id = req.params.id;
    db.query('UPDATE film SET ? WHERE film_id = ?',[req.body, id], (error) => {
        if (error) throw error;
        res.status(200).send(`Film with ${id} updated successfully!`);
    });
}); 

app.delete('/film-delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM film WHERE film_id = ?',id, (error) => {
        if (error) throw error;
        res.status(200).send(`Film with ${id} deleted successfully!`);
    });
}); 

//------------------- МЕТОДЫ для Категорий --------------



app.post('/category-add', (req, res) => {
    const category_info = req.body;
    db.query('INSERT INTO category SET ?',category_info, (error, result) => {
        if (error) throw error;
        res.status(201).send(`Category added with ID: ${result.insertId}`);
    });
}); 


app.put('/category-update/:id', (req, res) => {
    const id = req.params.id;
    db.query('UPDATE category SET ? WHERE category_id = ?',[req.body, id], (error) => {
        if (error) throw error;
        res.status(200).send(`Category with ${id} updated successfully!`);
    });
}); 

app.delete('/category-delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM category WHERE category_id = ?',id, (error) => {
        if (error) throw error;
        res.status(200).send(`Category with ${id} deleted successfully!`);
    });
}); 

app.listen(3000)