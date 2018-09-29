const express = require('express');
const Router = express.Router();
const Ctrl = require('../controllers');

Router.route('/').post(Ctrl.create);

Router.route('/:id')
  .get(Ctrl.read)
  .patch(Ctrl.update)
  .delete(Ctrl.destroy);

module.exports = Router;
