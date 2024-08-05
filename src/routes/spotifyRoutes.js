const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');
const authController = require('../controllers/authController');


router.get('/api/login', spotifyController.login);
router.get('/callback', spotifyController.callback);
router.get('/api/search', authController.authenticateToken, spotifyController.search);
router.get('/api/play', authController.authenticateToken, spotifyController.play);

module.exports = router;
