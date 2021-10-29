const router = require('express').Router();
const { notes } = require('../db/db.json');
const path = require('path');
const fs = require('fs');

router.get('/notes', (req, res) => {
    let results = notes;
    // if(req.query) {
    //     results = filterByQuery(req.query, results);
    // }
    //res.sendFile(path.join(__dirname, "../db/db.json"));
    console.log("db.content", notes);
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findbyId(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body = notes.length.toString();
    const note = saveNote(req.body, notes); 
    res.json(note);
});

module.exports = router;