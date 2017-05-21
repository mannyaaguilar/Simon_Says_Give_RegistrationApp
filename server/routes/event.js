var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// posts new events
router.post('/add', function(req,res) {
  console.log("inside /event/add route");
  console.log("object received is: ", req.body);
  var eventName = req.body.eventName;
  var eventTeam = req.body.eventTeam;
  var eventDescription = req.body.eventDescription;
  var eventLocation = req.body.eventLocation;
  var eventDate = req.body.eventDate;
  var eventFromTime = req.body.eventFromTime;
  var eventUntilTime = req.body.eventUntilTime;
  var eventUsername = 'MOA2017';

  // INSERT INTO event (event_name, event_team, event_description, event_location, event_date,
  // event_from_time, event_until_time, event_username) VALUES
  //('Birthday Celebration', 'MN', 'Biggest B-Day Celb', 'MOA', '2017-8-1','13:0','12:30','MOA2017');
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
      res.sendStatus(500);
    } else {
      var eventQuery = 'INSERT INTO event (event_name, event_team, event_description, event_location, event_date, ' +
        'event_from_time, event_until_time, event_username) VALUES ' +
        '($1, $2, $3, $4, $5, $6, $7, $8);'
      db.query(eventQuery,
      [eventName,eventTeam,eventDescription,eventLocation,eventDate,eventFromTime,eventUntilTime,eventUsername], function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.sendStatus(201); // succesful insert status
        }
      });
    }
  });
});

module.exports = router;
