//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

//## Car Stats Services [/carStats/{playerId}]
//### Increase Stat [POST]
router.get('/:playerId', function(request, response) {
  var query = '';
  var playerId = request.params.playerId;
  //Body elements
  var carId = request.body.carId;
  var statToIncrease = request.body.statToIncrease;
});

module.exports = router;
