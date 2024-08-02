const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const playlistController = require('../controllers/playlistController');




router.get('/all-playlists', playlistController.getPlaylists);
router.post('/create-playlist',

    body('playlist_name').notEmpty().withMessage('Enter Playlist Name.'),
    playlistController.createPlaylist
);


module.exports = router;

