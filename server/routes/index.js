const router = require('express').Router();
const SongController = require('../controllers/song');

router.get('/song', SongController.getOne);

module.exports = router;
