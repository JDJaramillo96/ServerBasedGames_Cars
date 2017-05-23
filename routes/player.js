//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');

//## Player Services [/player/{playerId}]
//### Get Player [GET]
router.get('/:playerId/', function(request, response) {
  var query = '';
  var playerId = request.params.winnerID;
  query = 'SELECT "name", "money", "experience" FROM "player" WHERE "id" IN ({0});';
  query = query.replace('{0}', playerId);

  try {
    database.query(query, function(result){
      response.send(JSON.stringify(result));
    });

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
