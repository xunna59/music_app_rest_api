const SpotifyModel = require('../models/spotifyModel');
const spotifyModel = new SpotifyModel();

async function getAccessToken(req, res, next) {
    try {
        const token = await spotifyModel.getAccessToken();
        res.json({ token });
    } catch (error) {
        console.error(error);
        //  res.status(500).send(error.message);
        next(error);
    }
}

async function getNewReleases(req, res, next) {
    try {
        const token = await spotifyModel.getAccessToken();
        const data = await spotifyModel.getNewReleases(token);
        res.json(data);
    } catch (error) {
        console.error(error);
        // res.status(500).send(error.message);
        next(error);
    }
}



async function handleCallback(req, res) {
    const { code } = req.query;

    try {
        const data = await spotifyModel.exchangeAuthorizationCode(code);
        const { access_token, refresh_token } = data;

        // Store the tokens or handle them as needed
        res.json({ access_token, refresh_token });
    } catch (error) {
        console.error(error);
        //  res.status(500).send('Error handling callback');
        next(error);
    }
}

async function playMusic(req, res) {
    const { deviceId, trackUri } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    try {
        await spotifyModel.playMusic(token, deviceId, trackUri);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error playing music');
    }
}


module.exports = {
    getAccessToken,
    getNewReleases,
    handleCallback,
    playMusic
};
