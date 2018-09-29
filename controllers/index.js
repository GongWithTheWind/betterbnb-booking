const db = require('../database/database.js');

module.exports = {
  read: (req, res) => {
    db.House.sync()
      .then(() => {
        return db.House.findAll();
      })
      .then(data => {
        res.send(data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].house_id === Number(req.params.id)) {
            return;
          }
        }
      });
  },
  create: (req, res) => {
    db.House.create(req.body).then(() => {
      db.House.findOrCreate({ where: { id: req.body.id } }).spread(
        (house, created) => {
          res.json(house);
          console.log(created);
        }
      );
    });
  },
  update: (req, res) => {
    db.House.findById({ id: req.body.id }).then(house => {
      house.update({ id: req.body.id }).then(() => {
        console.log('update');
      });
    });
  },
  destroy: (req, res) => {
    db.House.create({ id: 1 })
      .then(house => {
        // now you see me...
        return house.destroy();
      })
      .then(() => {
        res.json('ok');
      });
  }
};
