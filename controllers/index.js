const db = require('../database/database.js');
const cassandra = require('../database/cassandraDB.js');

module.exports = {
  read: (req, res) => {
    console.log('/houses hit');
    //CASSANDRA DB
    const house_id = req.params.id;
    cassandra.execute(
      `select * from houses where house_id='${house_id}'`,
      (err, results) => {
        if (err) return console.log(err);
        res.json(results.rows[0]);
      }
    );
    // OLD DATABASE
    // db.House.sync()
    //   .then(() => {
    //     return db.House.findAll();
    //   })
    //   .then(data => {
    //     res.send(data);
    //     for (var i = 0; i < data.length; i++) {
    //       if (data[i].house_id === Number(req.params.id)) {
    //         return;
    //       }
    //     }
    //   });
  },
  create: (req, res) => {
    //CASSANDRA CREATE NEW HOUSE
    const {
      house_id,
      reviews,
      price_per_night,
      service_fee,
      cleaning_fee
    } = req.body;
    console.log(req.body);
    cassandra.execute(
      `insert into houses (house_id, reviews, price_per_night, service_fee, cleaning_fee) values (?,?,?,?,?)`,
      [house_id, reviews, price_per_night, service_fee, cleaning_fee],
      { prepare: true },
      (err, result) => {
        if (err) return console.log(err);
        res.send('House created!');
      }
    );
    // db.House.create(req.body).then(() => {
    //   db.House.findOrCreate({ where: { id: req.body.id } }).spread(
    //     (house, created) => {
    //       res.json(house);
    //       console.log(created);
    //     }
    //   );
    // });
  },
  update: (req, res) => {
    //CASSANDRA DATABASE
    const { house_id } = req.body;
    var updates = Object.keys(req.body).map(function(key) {
      return req.body[key];
    });
    cassandra.execute(
      `UPDATE houses SET ? WHERE key='${house_id}'`,
      updates,
      err => {
        if (err) return res.send(err);
        res.send('House updated!');
      }
    );
    // OLD DATABASE
    // db.House.findById({ id: req.body.id }).then(house => {
    //   house.update({ id: req.body.id }).then(() => {
    //     console.log('update');
    //   });
    // });
  },
  destroy: (req, res) => {
    //CASSANDRA DATABASE
    cassandra.execute(
      `DELETE FROM houses WHERE house_id='${req.params.id}'`,
      err => {
        if (err) return res.send(err);
        res.send('House Deleted');
      }
    );
    // OLD DATABASE
    // db.House.create({ id: 1 })
    //   .then(house => {
    //     // now you see me...
    //     return house.destroy();
    //   })
    //   .then(() => {
    //     res.json('ok');
    //   });
  }
};
