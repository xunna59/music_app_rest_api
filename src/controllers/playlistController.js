const { validationResult } = require('express-validator');
const PlaylistModel = require('../models/playlistModel');
const playlistModel = new PlaylistModel();


const createPlaylist = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const { user_id, playlist_name } = req.body;

    try {
        const playlist = await playlistModel.createPlaylist(user_id, playlist_name);
        res.status(201).json({ success: true, message: 'Playlist created successfully', playlist });

    } catch (error) {

        next(error);

    }


};


const getPlaylists = async (req, res, next) => {
    try {

        const allPlaylists = await playlistModel.fetchPlaylists();
        res.status(200).json({ success: true, message: 'All Playlists', allPlaylists });

    } catch (error) {

    }
};












module.exports = {
    createPlaylist,
    getPlaylists
}