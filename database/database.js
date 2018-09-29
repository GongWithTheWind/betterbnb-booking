const Sequelize = require('sequelize');
// const config = require('../config/config.json');

const sequelize = new Sequelize('bookings', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql'
});

const House = sequelize.define('Houses', {
  house_id: { type: Sequelize.INTEGER, unique: true },
  reviews: Sequelize.INTEGER,
  price_per_night: Sequelize.INTEGER,
  service_fee: Sequelize.INTEGER,
  cleaning_fee: Sequelize.INTEGER
});

const CustomerInfo = sequelize.define('CustomerInfos', {
  house_id: Sequelize.INTEGER,
  price_per_night: Sequelize.INTEGER,
  service_fee: Sequelize.INTEGER,
  cleaning_fee: Sequelize.INTEGER,
  total_charged: Sequelize.INTEGER,
  adults: Sequelize.INTEGER,
  chldren: Sequelize.INTEGER,
  infants: Sequelize.INTEGER,
  start_date: Sequelize.INTEGER,
  end_date: Sequelize.INTEGER
});

module.exports = {
  House: House,
  CustomerInfo: CustomerInfo
};
