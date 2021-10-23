const router = require('express').Router();
const noteRoutes = require('./note-routes');
router.use(noteRoutes);

module.exports = router;