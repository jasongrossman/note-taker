const router = require('express').Router();
const noteRoutes = require('./note-routes');
router.use(require('./htmlRoutes/index'))
router.use(noteRoutes);

module.exports = router;