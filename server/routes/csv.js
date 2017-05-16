var express = require('express');
var router = express.Router();
var csv = require('csvtojson')
var pool = require('../modules/pool');

// Handles POST request with new user data
router.post('/upload', function(req, res, next) {
  var fileContent = req.body.fileContent;
  var message = '';

  // deletes temporary table
  deleteJSONTable();

  // converts fileContent to JSON
  console.log('Converting to JSON');
  csv({noheader:false})
  .fromString(fileContent)
  .on('end_parsed',function(jsonArrObj) {
    console.log('Finished conversion', jsonArrObj);

    // Inserts into json_volunteer table
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database');
      } else {
        for (var i = 0; i < jsonArrObj.length; i++) {
          jsonObject = jsonArrObj[i];
          db.query('INSERT INTO json_volunteer (info) VALUES ($1);',
          [jsonObject], function(queryError,result) {
            done();
            if (queryError) {
              console.log('Error inserting into json_volunteer table');
            }
          });
        } // end of for loop

        // Moves information into volunteer table
        console.log('INSERT INTO volunteer STARTED!');
        db.query("INSERT INTO volunteer (first_name, last_name, email) " +
        "SELECT INITCAP(info ->> 'First Name') AS first_name, INITCAP(info ->> 'Last Name') AS last_name, " +
        "LOWER(info ->> 'Email') AS email FROM json_volunteer " +
        "ON CONFLICT DO NOTHING;",
         function(queryError,result) {
          done();
          if (queryError) {
            console.log('Error inserting into volunteer table');
            message = 'Error inserting into volunteer table';
            res.send(message);
          } else {
            console.log(result);
            message = 'Import finished Successfully. Number of volunteers inserted: ' + result.rowCount;
            res.send(message);
          }
        });
      };
    }); // pool.connect
  }); // end of csv

});

// Deletes JSON formatted volunteer table
function deleteJSONTable() {
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
    } else {
      db.query('DELETE FROM json_volunteer', function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error deleting json_volunteer table');
        }
      });
    }
  });
};


module.exports = router;
