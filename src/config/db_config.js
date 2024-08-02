// Import database connection data
const { Pool } = require('pg');
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, POOL_MAX, IDLE_TIMEOUT, CONNECTION_TIMEOUT } = require('./config');
// Initiate database connection
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
    max: POOL_MAX,
    idleTimeoutMillis: IDLE_TIMEOUT,
    connectionTimeoutMillis: CONNECTION_TIMEOUT,
    // ssl: true
});

module.exports = pool;