const { Router, application } = require('express');
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

koalaRouter.put('/:id', (req, res) => {
    //in postman you have to include an id #
    //PUT localhost:5000/koalas/5
    //in your server you'd see {id:'5'}
    console.log('req.params:', req.params);
    //***have to have: app.use(bodyParser.json()); in server.js
    //in postman YOU have to enter dummy data
    //ex. {"name": "Scotty"}
    console.log('req.body:', req.body);

    let idToUpdate = req.params.id;
    let newReadyToTransfer = req.body.ready_to_transfer;

    let sqlQuery = `
        UPDATE "koalas"
            SET "ready_to_transfer"=$1
            WHERE "id"=$2;
    `
    let sqlValues = [newReadyToTransfer, idToUpdate];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('something broke in PUT/koala/:id', dbErr);
            res.sendStatus(500);
        })
}) //end PUT route

// DELETE
koalaRouter.delete('/:id', (req,res) => {
    console.log(req.params);
    let idToDelete = req.params.id;

    let sqlQuery = `
    DELETE FROM "koalas"
        WHERE "id"=$1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
     .then((dbRes) => {
        res.sendStatus(200);
     })
     .catch((dbErr) => {
        console.log('DELETE broke in /koalas/:id', dbErr);
        res.sendStatus(500);
     })
})


module.exports = koalaRouter;