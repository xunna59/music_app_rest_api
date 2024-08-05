const pool = require('../config/db_config');


class Track {


    async uploadTrack(title, artist, album, genre, file_path) {
        try {

            const result = await pool.query(
                'INSERT INTO music_files (title, artist, album, genre, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, artist, album, genre, file_path]
            );
            return result.rows[0];

        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }


    async getAllTracks() {
        try {
            const result = await pool.query(
                'SELECT * FROM music_files'
            );

            return result.rows;
        } catch (error) {

            throw new Error(`Failed to fetch tracks: ${error.message}`);
        }
    }

    async getTrackById(id) {
        try {
            const result = await pool.query(
                'SELECT id, title, artist, album, genre, file_path FROM music_files WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }




}

module.exports = Track;