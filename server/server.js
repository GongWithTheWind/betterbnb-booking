const express = require('express');
const app = express();
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('../routes');
// cassandra db
const cassandra = require('../database/cassandraDB.js');
cassandra.connect(err => {
  if (err) return console.log(err);
  console.log('Cassandra connected');
});

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

app.listen(port, () => {
  console.log('Currently listening on port 3004');
});
