//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

//Race services parameters
var moneyForFirstPlace = 50;
var experienceForFirstPlace = 10;
var moneyForSecondPlace = 25;
var experienceForSecondPlace = 5;
var moneyForThirdPlace = 10;
var experienceForThirdPlace = 2;

//## Race Services [/race]
//### Report Race [POST]
router.get('/', function(request, response) {
  var query = '';
  var firstPlaceId = request.body.firstPlaceId;
  var secondPlaceId = request.body.secondPlaceId;
  var thirdPlaceId = request.body.thirdPlaceId;
  //Response
  query = 'SELECT "money", "experience" FROM "player" WHERE "id" IN ({0}) OR "id" IN ({1}) OR "id" IN ({2});';
  query = query.replace('{0}', firstPlaceId);
  query = query.replace('{1}', secondPlaceId);
  query = query.replace('{2}', thirdPlaceId);

  var moneyForFirstPlaceUpdate;
  var experienceForFirstPlaceUpdate;
  var moneyForSecondPlaceUpdate;
  var experienceForSecondPlaceUpdate;
  var moneyForThirdPlaceUpdate;
  var experienceForThirdPlaceUpdate;

  try {
    database.query(query, function(result) {
      moneyForFirstPlaceUpdate = result[0].money + moneyForFirstPlace;
      experienceForFirstPlaceUpdate = result[0].experience + experienceForFirstPlace;
      moneyForSecondPlaceUpdate = result[1].money + moneyForSecondPlace;
      experienceForSecondPlaceUpdate = result[1].experience + experienceForSecondPlace;
      moneyForThirdPlaceUpdate = result[2].money + moneyForThirdPlace;
      experienceForThirdPlaceUpdate = result[2].experience + experienceForThirdPlace;

      query = 'UPDATE "player" SET "money" = {0} WHERE "id" IN ({1});';
      query = query.replace('{0}', moneyForThirdPlaceUpdate);
      query = query.replace('{1}', firstPlaceId);

      try {
        database.query(query, function(result){
          query = 'UPDATE "player" SET "experience" = {0} WHERE "id" IN ({1});';
          query = query.replace('{0}', experienceForFirstPlaceUpdate);
          query = query.replace('{1}', firstPlaceId);

          try {
            database.query(query, function(result){
              query = 'UPDATE "player" SET "money" = {0} WHERE "id" IN ({1});';
              query = query.replace('{0}', moneyForSecondPlaceUpdate);
              query = query.replace('{1}', secondPlaceId);

              try {
                database.query(query, function(result){
                  query = 'UPDATE "player" SET "experience" = {0} WHERE "id" IN ({1});';
                  query = query.replace('{0}', experienceForSecondPlaceUpdate);
                  query = query.replace('{1}', secondPlaceId);

                  try {
                    database.query(query, function(result){
                      query = 'UPDATE "player" SET "money" = {0} WHERE "id" IN ({1});';
                      query = query.replace('{0}', moneyForThirdPlaceUpdate);
                      query = query.replace('{1}', thirdPlaceId);

                      try {
                        database.query(query, function(result){
                          query = 'UPDATE "player" SET "experience" = {0} WHERE "id" IN ({1});';
                          query = query.replace('{0}', experienceForThirdPlaceUpdate);
                          query = query.replace('{1}', thirdPlaceId);

                          try {
                            database.query(query, function(result){
                              response.send("Race Reported")
                            })

                          } catch (error) {
                            console.error(error);
                          }
                        })

                      } catch (error) {
                        console.error(error);
                      }
                    })

                  } catch (error) {
                    console.error(error);
                  }
                })

              } catch (error) {
                console.error(error);
              }
            });

          } catch (error) {
            console.error(error);
          }
        });

      } catch (error) {
        console.error(error);
      }
    });

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
