const express = require('express');
const Router = express.Router();
const Ctrl = require('../controllers');

Router.route('/:id')
  .get(Ctrl.read)
  .post(Ctrl.create)
  .patch(Ctrl.update)
  .delete(Ctrl.destroy);

module.exports = Router;
