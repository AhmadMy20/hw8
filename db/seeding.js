var pool = require('../queries.js');
var fs = require('fs');

const seedQuery = fs.readFileSync('db/seeding.sql', {encoding: 'utf8'});
pool.query(seedQuery, (err, res) => {
    console.log(err);
    console.log('seeding complete');
    pool.end();
});