const PlaylistModel = require('../models/playlistModel');
const playlistModel = new PlaylistModel();
const { validationResult } = require('express-validator');




const createPlaylist = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { playlist_name } = req.body;
    const userId = req.user.userId
    try {
        const playlist = await playlistModel.createPlaylist(userId, playlist_name);
        res.status(201).json({ success: true, message: "Playlist created successfully", playlist });
    } catch (error) {
        next(error);
    }
};

const getAllPlaylists = async (req, res, next) => {
    try {
        const playlists = await playlistModel.getAllPlaylists();
        res.status(200).json(playlists);
    } catch (error) {
        next(error);
    }
};

const addTrackToPlaylist = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { playlist_id, music_file_id } = req.body;
    try {
        const playlistTrack = await playlistModel.addTrackToPlaylist(playlist_id, music_file_id);
        res.status(201).json({ success: true, message: "Track Added to Playlist", playlistTrack });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPlaylist,
    getAllPlaylists,
    addTrackToPlaylist
};