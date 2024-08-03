const Playlist = require('../models/playlistModel');



const createPlaylist = async (req, res) => {
    try {
        const { userId, playlistName } = req.body;
        const playlistId = await createSpotifyPlaylist(userId, playlistName);
        res.status(201).json({ success: true, playlist: { id: playlistId } });
    } catch (error) {
        console.error('Error in createPlaylist controller:', error);
        res.status(500).json({ error: 'Failed to create playlist' });
    }
};

const addTrackToPlaylist = async (req, res) => {

    const { playlistId, trackUri } = req.body;
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new Error('Playlist not found');
        }
        await addTrackToSpotifyPlaylist(playlist.spotifyPlaylistId, trackUri);
        res.status(200).json({ success: true, message: 'Track added to playlist' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createPlaylist,
    addTrackToPlaylist
};