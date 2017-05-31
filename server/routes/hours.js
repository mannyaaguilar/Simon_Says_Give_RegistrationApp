var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// Get route for all events
router.post('/get', function(req, res) {
  var staff_name = req.body.staff_name;
  if ( req.isAuthenticated() ) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if ( errorConnectingToDatabase ) {
        res.sendStatus(500);
      }
      else {
        var eventQuery = 'SELECT * FROM volunteer_hours WHERE ' +
          '(event_id = $1 AND staff_name = $2);';
        db.query(eventQuery, ['OFFICEHOURSLOGS', staff_name],
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

// Posts new events
router.post('/add', function(req, res) {
  if ( req.isAuthenticated() ) {
    var eventDate = req.body.eventDate;
    var eventFromTime = req.body.eventFromTime;
    var eventUntilTime = req.body.eventUntilTime;
    var staff_name = req.body.staff_name;
    var eventID = 'OFFICEHOURSLOGS';
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if ( errorConnectingToDatabase ) {
        res.sendStatus(500);
      }
      else {
        var eventQuery = 'INSERT INTO volunteer_hours (event_date, event_from_time, ' +
          'event_until_time, event_id, volunteer_id, staff_name) VALUES ($1, $2, $3, $4, $5, $6);'
        db.query(eventQuery,
        [eventDate, eventFromTime, eventUntilTime, eventID, 987654321, staff_name],
          function(queryError, result) {
          done();
          if ( queryError ) {
            res.send("Error");
          }
          else {
            res.send("Event created successfully.")
          }
        });
      }
    });
  }
  else {
    res.sendStatus(401);
  }
});

// Deletes an event from the database
router.delete('/delete/:id', function(req, res) {
  console.log("/delete route hit");
  if ( req.isAuthenticated() ) {
    var id = req.params.id;
    pool.connect(function(errorConnectingToDatabase, db, done) {
      if ( errorConnectingToDatabase ) {
        res.sendStatus(500);
      }
      else {
        db.query('DELETE FROM volunteer_hours WHERE event_code = $1;', [id],
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
