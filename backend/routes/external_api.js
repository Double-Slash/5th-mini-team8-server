var express = require('express');
var router = express.Router();

const external_apiController = require('../controller/external_apiController');

router.get('/api_to_db', external_apiController.api_to_db);

module.exports = router;