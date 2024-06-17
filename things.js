var express = require('express');
var router = express.Router(); // Menggunakan express.Router() untuk membuat objek router
var pool = require('./queries.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/film', (req, res) => {
    const limit = req.query.limit ? `LIMIT ${parseInt(req.query.limit)}` : '';
    const query = `SELECT * FROM film ${limit}`;
    
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(result.rows);
    });
});


router.get('/film/:film_id', (req, res) => {
    const filmId = parseInt(req.params.film_id);
    if (isNaN(filmId)) {
        return res.status(400).send('Invalid film_id');
    }
    pool.query('SELECT * FROM film WHERE film_id = $1', [filmId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(result.rows);
    });
});

router.get('/category', (req, res) => {
    const limit = req.query.limit ? `LIMIT ${parseInt(req.query.limit)}` : '';
    const query = `SELECT * FROM category ${limit}`;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(result.rows);
    });
});

router.get('/category/:category_id', (req, res) => {
    const categoryId = parseInt(req.params.category_id);
    if (isNaN(categoryId)) {
        return res.status(400).send('Invalid category_id');
    }
    pool.query('SELECT * FROM category WHERE category_id = $1', [categoryId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(result.rows);
    });
});

router.get('/category/:category_id/films', (req, res) => {
    const categoryId = parseInt(req.params.category_id);
    if (isNaN(categoryId)) {
        return res.status(400).send('Invalid category_id');
    }
    pool.query(
        `SELECT film.*
         FROM film
         JOIN film_category ON film.film_id = film_category.film_id
         JOIN category ON film_category.category_id = category.category_id
         WHERE category.category_id = $1`,
        [categoryId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.json(result.rows);
        }
    );
});

module.exports = router;
