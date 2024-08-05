const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const playlistController = require('../controllers/playlistController');



router.get('/get-playlists', authController.authenticateToken, playlistController.getAllPlaylists);


router.post('/create-playlist',

    authController.authenticateToken,
    body('playlist_name').notEmpty().withMessage('playlist name is required'),

    playlistController.createPlaylist
);


router.post('/add-to-playlist',

    body('playlist_id').isInt().withMessage('playlist is required'),
    body('music_file_id').isInt().withMessage('Music file required'),

    authController.authenticateToken, playlistController.addTrackToPlaylist);

module.exports = router;


