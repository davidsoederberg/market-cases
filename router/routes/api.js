const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.route('/user')
  .get(userController.apiGet);

router.route('/user/:id')
  .get(userController.apiGetOne);

module.exports = router;
