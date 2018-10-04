const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  database: 'bnb',
  port: 5432
});
//connection query and creation of tables

module.exports = client;
