var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// posts new events
router.post('/add', function(req,res) {
  console.log("inside /event/add route");
  console.log("object received is: ", req.body);
  var eventCode = req.body.eventCode;
  var eventName = req.body.eventName;
  var eventTeam = req.body.eventTeam;
  var eventDescription = req.body.eventDescription;
  var eventLocation = req.body.eventLocation;
  var eventDate = req.body.eventDate;
  var eventFromTime = req.body.eventFromTime;
  var eventUntilTime = req.body.eventUntilTime;

  // INSERT INTO event (event_name, event_team, event_description, event_location, event_date,
  // event_from_time, event_until_time, event_username) VALUES
  //('Birthday Celebration', 'MN', 'Biggest B-Day Celb', 'MOA', '2017-8-1','13:0','12:30','MOA2017');
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
      res.sendStatus(500);
    } else {
      var eventQuery = 'INSERT INTO event (event_code, event_name, event_team, event_description, event_location, event_date, ' +
        'event_from_time, event_until_time) VALUES ' +
        '($1, $2, $3, $4, $5, $6, $7, $8);'
      db.query(eventQuery,
      [eventCode, eventName,eventTeam,eventDescription,eventLocation,eventDate,eventFromTime,eventUntilTime], function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error making query',queryError);
          // res.sendStatus(500);
          res.send("Error inserting information, make sure Event Code doesn't exist");
        } else {
          res.send("Event created successfully")
          // res.sendStatus(201); // succesful insert status
        }
      });
    }
  });
});

module.exports = router;
