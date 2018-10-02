const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  keyspace: 'bnb'
});

module.exports = client;
