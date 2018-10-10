const { Client } = require('pg');
const client = new Client({
  user: 'power_user',
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASS,
  database: 'bnb',
  port: 5432
});

module.exports = client;
