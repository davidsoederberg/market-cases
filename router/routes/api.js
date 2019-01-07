const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const secController = require('../controllers/securitiesController');

router.route('/user')
  .post(userController.apiPost)
  .get(userController.apiGet);

router.route('/user/:id')
  .get(userController.apiGetOne);


router.route('/user/cases/:id')
  .put(userController.apiUpdateCases);

router.route('/sec')
  .post(secController.apiPost)
  .get(secController.apiGet);

router.route('/sec/:id')
  .get(secController.apiGetOne);

module.exports = router;
