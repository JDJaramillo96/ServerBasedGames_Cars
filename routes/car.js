//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

//## Car Services [/car/{playerId}]
//### Get Car [GET]
router.post('/:playerId', function(request, response) {
  var query='';
  var playerId = request.params.playerId;
});
//### Unlock Car [POST]
router.post('/:playerId', function(request, response){
  var query='';
  var playerId = request.params.playerId;
  //Body elements
  var carId = request.body.carId;
});

module.exports = router;
