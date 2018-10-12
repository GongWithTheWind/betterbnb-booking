//require('dotenv').config();
require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('../routes');
const cors = require('cors');
app.use(cors());

// REDIS IMPLEMENTATION
// var redis = require('redis');
// var client = redis.createClient();
// client.on('connect', function() {
//   console.log('Redis client connected');
// });

// client.on('error', function(err) {
//   console.log('Something went wrong ' + err);
// });
// cassandra db
// const cassandra = require('../database/cassandraDB.js');
// cassandra.connect(err => {
//   if (err) return console.log(err);
//   console.log('Cassandra connected');
// });

//postgres db
const postgres = require('../database/postgresDB');
postgres.connect(err => {
  if (err) return console.log(err);
  console.log('Postgres Connected');
});

// console.log('gets passed this');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/:id', express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use('/house', routes);

app.use('/', express.static('public'));
app.listen(port, () => {
  console.log('Currently listening on port 3004');
});
