const pool = require('../config/db_config');


const createPlaylist = async ({ userId, spotifyPlaylistId, playlistName }) => {
    const result = await pool.query(
        'INSERT INTO playlists (user_id, spotify_playlist_id, playlist_name) VALUES ($1, $2, $3) RETURNING *',
        [userId, spotifyPlaylistId, playlistName]
    );
    return result.rows[0];
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM playlists WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    create: createPlaylist,
    findById
};

