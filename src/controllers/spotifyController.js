const { spotifyApi, getAccessToken } = require('../services/spotify');

async function getTracks(req, res, next) {
    try {
        await getAccessToken();
        const track = await spotifyApi.getTrack(req.params.id);
        res.json(track.body);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        next(error);
    }
}

module.exports = {
    getTracks
};
