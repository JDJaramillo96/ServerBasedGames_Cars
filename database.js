//Dependencies
var pg = require('pg');

var config = {
  user: 'qbfsofxr', //env var: PGUSER
  database: 'qbfsofxr', //env var: PGDATABASE
  password: 'WZKNOswC1v7309ltTkH128jvg8S3TWAt', //env var: PGPASSWORD
  host: 'stampy.db.elephantsql.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

//Query function
function query (sqlStatement, onCompleted) {
  pool.connect (function (error, client) {
    if (error)
      return console.error('Error fetching client from pool', error);

    client.query (sqlStatement, function (error, result) {
      if (error)
        return console.error('Error running query', error);

      onCompleted (result.rows);

      client.end (function (error) {
        if (error)
          return console.error('Error ending the client', error);
      });
    });
  });
  pool.on ('error', function (error, client) {
    console.error('Idle client error', error.message, error.stack);
  });
}

//Exporting module
module.exports.query = query;
