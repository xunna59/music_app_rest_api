const pool = require('../config/db_config');

class PlaylistModel {


    async createPlaylist(user_id, playlist_name) {

        try {

            const result = await pool.query('INSERT INTO playlists (user_id, playlist_name) VALUE($1, $2) RETURNING *',
                [user_id, playlist_name]
            );

            return result.rows[0];

        } catch (error) {

            throw new Error(` ${error.message}`);

        }

    }


    async fetchPlaylists() {

        try {

            const result = await pool.query('SELECT * FROM playlists');
            return result.rows;

        } catch (error) {

            throw new Error(` ${error.message}`);

        }

    }

    // async deletePlaylist(playlist_id) {

    //     try{

    //     }catch(error){
    //         throw new Error(`${error.message}`);
    //     }



    // }





}

module.exports = PlaylistModel;