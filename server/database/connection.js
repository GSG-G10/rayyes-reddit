require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
  max: process.env.DB_MAX_CONNECTIONS || 2
});

module.exports = pool;
