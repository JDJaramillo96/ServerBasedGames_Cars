var express = require('express');
var router = express.Router();

//#Multiplayer-RPG API
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Car API!' });
});

module.exports = router;
