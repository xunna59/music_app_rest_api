require('dotenv').config();
// initiate required environment variables
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT,
    POOL_MAX: process.env.POOL_MAX || 20,
    IDLE_TIMEOUT: process.env.IDLE_TIMEOUT || 30000,
    CONNECTION_TIMEOUT: process.env.CONNECTION_TIMEOUT || 2000,
};
