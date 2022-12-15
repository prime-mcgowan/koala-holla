const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET
koalaRouter.get('/', (req, res) => {
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
koalaRouter.post('/', (req,res) => {
    let newKoala = req.body;
    console.log(`Adding new koala`, newKoala);
    
    let sqlQuery = `
    INSERT INTO "koalas"
    ("name", "gender", "age", "ready_to_transfer","notes")
        VALUES ($1, $2, $3, $4, $5);
    `;

    let sqlValues = [newKoala.name, newKoala.gender,
                    newKoala.age, newKoala.ready_to_transfer,
                    newKoala.notes];
        pool.query(sqlQuery, sqlValues)
         .then((dbRes) => {
            res.sendStatus(200);
         })
         .catch((dbErr) => {
            console.log('Error adding new koala', dbErr)
            res.sendStatus(500);
         })


})

// PUT


// DELETE

module.exports = koalaRouter;