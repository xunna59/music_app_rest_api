const axios = require('axios');
const qs = require('qs');

class SpotifyModel {
    constructor() {
        this.clientId = process.env.SPOTIFY_CLIENT_ID;
        this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    }

    async getAccessToken() {
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                grant_type: 'client_credentials'
            })
        };

        try {
            const response = await axios(authOptions);
            return response.data.access_token;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async getNewReleases(token) {
        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async exchangeAuthorizationCode(code) {
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUri
            })
        };

        try {
            const response = await axios(authOptions);
            return response.data;
        } catch (error) {
            throw new Error('Error exchanging authorization code');
        }
    }

    async playMusic(token, deviceId, trackUri) {
        const playOptions = {
            method: 'put',
            url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                uris: [trackUri]
            })
        };

        try {
            await axios(playOptions);
        } catch (error) {
            throw new Error('Error playing music');
        }
    }

}

module.exports = SpotifyModel;


