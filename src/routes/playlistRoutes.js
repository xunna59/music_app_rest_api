const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');




router.get('/all-playlists', playlistController.getPlaylists);
router.post('/create-playlist',
    authController.authenticateToken,
    body('playlist_name').notEmpty().withMessage('Enter Playlist Name.'),
    playlistController.createPlaylist
);


module.exports = router;

