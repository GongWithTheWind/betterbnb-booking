const path = require('path');
const fs = require('fs');
const async = require('async');
const uniqid = require('uniqid');
const faker = require('faker');

console.log('starting script');
const convert = items => {
  const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  let csv = items.map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
  );
  csv.unshift(header.join(','));
  csv = csv.join('\r\n');
  return csv;
};
const generate = function(cb) {
  let arr = [];
  for (let j = 0; j < 1000000; j++) {
    const obj = {
      house_id: uniqid(),
      reviews: faker.lorem.paragraph(),
      price_per_night: faker.commerce.price(),
      service_fee: faker.commerce.price(),
      cleaning_fee: faker.commerce.price()
    };
    arr.push(obj);
  }
  fs.appendFileSync(path.join(__dirname, `data.csv`), convert(arr), err => {
    if (err) return console.log(err);
    console.log('set done');
  });
  delete arr;
  cb(console.log('set done'));
};
async.parallel([
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  },
  function(cb) {
    generate(cb);
  }
]);
