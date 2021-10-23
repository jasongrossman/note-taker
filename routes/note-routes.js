const router = require('express').Router();
const { notes } = require('../db/db.json');

router.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/api/notes/:id', (req, res) => {
    const result = findbyId(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/api/notes', (req, res) => {
    req.body = notes.length.toString();
    const note = saveNote(req.body, notes); 
    res.json(note);
});

module.exports = router;