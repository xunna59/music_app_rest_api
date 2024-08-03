const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const playlistController = require('../controllers/playlistController');



router.post('/create-playlist', authController.authenticateToken, playlistController.createPlaylist);
router.post('/add-track', authController.authenticateToken, playlistController.addTrackToPlaylist);

module.exports = router;


