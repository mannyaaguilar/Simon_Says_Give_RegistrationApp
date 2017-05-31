var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// Get route for all records
router.post('/get', function(req, res) {
  if ( req.isAuthenticated() ) {
    var staff_name = req.user.username;
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if ( errorConnectingToDatabase ) {
        res.sendStatus(500);
      }
      else {
        var hoursQuery = 'SELECT * FROM volunteer_hours WHERE ' +
          '(event_id = $1 AND staff_name = $2);';
        db.query(hoursQuery, ['OFFICEHOURSLOGS', staff_name],
          function(queryError, result) {
          done();
          if ( queryError ) {
            res.sendStatus(500);
          }
          else {
            res.send(result.rows);
          }
        });
      }
    });
  }
  else {
    res.sendStatus(401);
  }
});

// Posts new records
router.post('/add', function(req, res) {
  console.log("ssgHours/add: ", req.body);
  if ( req.isAuthenticated() ) {
    var hoursDate = req.body.hoursDate;
    var hoursFromTime = req.body.hoursFromTime;
    var hoursUntilTime = req.body.hoursUntilTime;
    var staff_name = req.body.name || "supername";
    var eventID = 'OFFICEHOURSLOGS';
    var officeHoursVolID = 987654321;

    pool.connect(function(errorConnectingToDatabase, db, done) {
      if ( errorConnectingToDatabase ) {
        res.sendStatus(500);
      }
      else {
        var hoursQuery = 'INSERT INTO volunteer_hours (date, time_in, ' +
          'time_out, event_id, volunteer_id, staff_name) VALUES ($1, $2, $3, $4, $5, $6);';
        db.query(hoursQuery,
        [hoursDate, hoursFromTime, hoursUntilTime, eventID, officeHoursVolID, staff_name],
          function(queryError, result) {
          done();
          if ( queryError ) {
            res.sendStatus(500);
          }
          else {
            res.send("Record created successfully.");
          }
        });
      }
    });
  }
  else {
    res.sendStatus(401);
  }
});

// Deletes a record from the database
router.delete('/delete/:id', function(req, res) {
  console.log("/delete route hit");
  if ( req.isAuthenticated() ) {
    var id = req.params.id;
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if ( errorConnectingToDatabase ) {
        res.sendStatus(500);
      }
      else {
        db.query('DELETE FROM volunteer_hours WHERE id = $1;', [id],
        function(queryError, result) {
          done();
          if ( queryError ) {
            res.sendStatus(500);
          }
          else {
            res.sendStatus(200);
          }
        });
      }
    });
  }
  else {
    res.sendStatus(401);
  }
});

module.exports = router;
