const pool = require('../config/db_config');

class UserModel {
    // Create a new user Function
    async createUser(username, email, password, dob, gender) {
        try {
            const result = await pool.query(
                'INSERT INTO users (username, email, password, dob, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [username, email, password, dob, gender]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find a user by emailFunction
    async findUserByEmail(email) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = UserModel;
