var express = require('express');
var router = express.Router();
var csv = require('csvtojson')
var pool = require('../modules/pool');

// Handles POST request with new user data
router.post('/upload', function(req, res, next) {

  // deletes temporary table
  deleteJSONTable();

  // converts csv string received to JSON and calls function to insert into
  // temporary table
  console.log('Converting to JSON');
  csvString = req.body.fileContent;
  csv({noheader:false})
  .fromString(csvString)
  .on('json',function(json) {
    console.log(json);
    insertInJSONTable(json)
  })
  .on('done',function() {
    console.log('Finished conversion');
  })

  res.send('From server: /upload');
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
          console.log('Error making query');
        }
      });
    }
  });
};

// Inserts into JSON formatted volunteer table
function insertInJSONTable(jsonObject) {
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
    } else {
      db.query('INSERT INTO json_volunteer (info) VALUES ($1);',
      [jsonObject], function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error making query');
        }
      });
    };
  });
};


module.exports = router;
