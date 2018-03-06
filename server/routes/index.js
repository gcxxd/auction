var express = require('express');
var data = require('../mock.json');
var router = express.Router();

var products = data.product;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(products);
});

module.exports = router;
