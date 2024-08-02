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


        // Add Spotify tokens to existing JWT
        const userToken = req.cookies.token; // Get the existing token from the cookie
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

        const newPayload = {
            ...decoded,
            spotify_access_token: access_token,
            spotify_refresh_token: refresh_token
        };
        const newToken = jwt.sign(newPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', newToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Redirect to a page where the user can play music
        res.redirect('/play');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error handling callback');
    }
}

async function playMusic(req, res) {
    const { deviceId, trackUri } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const spotifyAccessToken = decoded.spotify_access_token;

        if (!spotifyAccessToken) {
            return res.status(401).json({ error: 'Spotify access token missing' });
        }

        await spotifyModel.playMusic(spotifyAccessToken, deviceId, trackUri);
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
