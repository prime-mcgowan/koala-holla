const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET
koala.Router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "koalas"
        ORDER BY "name" ASC;
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            res.send(dbRes.rows);
        }).catch((dbErr) => {
        console.log('error getting koalas', dbErr);
        res.sendStatus(500);
    });
});


// POST


// PUT


// DELETE

module.exports = koalaRouter;