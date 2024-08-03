const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');
const authController = require('../controllers/authController');


router.get('/login', spotifyController.login);
router.get('/callback', spotifyController.callback);
router.get('/search', authController.authenticateToken, spotifyController.search);
router.get('/play', authController.authenticateToken, spotifyController.play);

module.exports = router;
