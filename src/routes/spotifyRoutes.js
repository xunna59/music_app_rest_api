const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');
const authController = require('../controllers/authController');

router.get('/auth/spotify', spotifyController.getAccessToken);
router.get('/spotify/new-releases', spotifyController.getNewReleases);
router.get('/callback', spotifyController.handleCallback);
router.put('/spotify/play', authController.authenticateToken, spotifyController.playMusic);

module.exports = router;