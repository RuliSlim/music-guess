const router = require('express').Router();
const SongController = require('../controllers/song');

router.get('/song', SongController.getOne);
router.get


module.exports = router;