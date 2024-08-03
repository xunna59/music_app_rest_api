const pool = require('../config/db_config');


class Track {
    static async findOrCreate(spotifyTrackId, name, artist) {
        try {
            let result = await pool.query(
                'SELECT id FROM tracks WHERE spotify_track_id = $1',
                [spotifyTrackId]
            );

            if (result.rows.length > 0) {
                return result.rows[0].id;
            }

            result = await pool.query(
                'INSERT INTO tracks (spotify_track_id, name, artist) VALUES ($1, $2, $3) RETURNING id',
                [spotifyTrackId, name, artist]
            );

            return result.rows[0].id;
        } catch (error) {
            throw new Error(`Error finding or creating track: ${error.message}`);
        }
    }
}

module.exports = Track;