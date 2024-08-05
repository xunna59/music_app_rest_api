const pool = require('../config/db_config');


class PlaylistModel {



    async createPlaylist(userId, playlist_name) {
        try {

            const result = await pool.query(
                'INSERT INTO playlists (user_id, playlist_name) VALUES ($1, $2) RETURNING *',
                [userId, playlist_name]
            );
            return result.rows[0];

        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async getAllPlaylists() {
        try {
            const result = await pool.query(
                'SELECT * FROM playlists'
            );

            return result.rows;
        } catch (error) {

            throw new Error(`Failed to fetch playlists: ${error.message}`);
        }
    }

    async addTrackToPlaylist(playlist_id, music_file_id) {
        try {
            const result = await pool.query(
                'INSERT INTO playlist_tracks (playlist_id, music_file_id) VALUES ($1, $2) RETURNING *',
                [playlist_id, music_file_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }







}



// const findById = async (id) => {
//     const result = await pool.query('SELECT * FROM playlists WHERE id = $1', [id]);
//     return result.rows[0];
// };

module.exports = PlaylistModel;

