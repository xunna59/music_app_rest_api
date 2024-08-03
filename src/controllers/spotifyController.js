const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

exports.login = (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
};

exports.callback = (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
        console.error('Error:', error);
        res.send(`Error: ${error}`);
        return;
    }

    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        console.log(accessToken, refreshToken);
        res.send('Successful');

        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expiresIn / 2 * 1000);
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error getting token');
    });
};

exports.search = (req, res) => {
    const { q } = req.query;

    spotifyApi.searchTracks(q).then(searchData => {
        const trackUrl = searchData.body.tracks.items[0].url;
        res.send({ url: trackUrl });
    }).catch(err => {
        res.send(`Error searching ${err}`);
    });
};

exports.play = (req, res) => {
    const { uri } = req.query;

    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started');
    }).catch(err => {
        res.send(`Error playing ${err}`);
    });
};
