var express = require('express');
var app = express();
var pool = require('./queries.js');
var things = require('./things.js');


// Menggunakan middleware untuk rute '/api'
app.use('/api', things);

// Menggunakan pool.connect() untuk membuat koneksi ke database
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to database');

    // Release the client when done with it
    release();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
