var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


// Get route for all events
router.get('/', function(req,res) {
  if(req.isAuthenticated()) {
    // SELECT * FROM event;
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        res.sendStatus(500);
      } else {
        var eventQuery = 'SELECT * FROM event;';
        db.query(eventQuery,function(queryError,result) {
          done();
          if (queryError) {
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Posts new events
router.post('/add', function(req,res) {
  if(req.isAuthenticated()) {
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
        res.sendStatus(500);
      } else {
        var eventQuery = 'INSERT INTO event (event_code, event_name, event_team, event_description, event_location, event_date, ' +
          'event_from_time, event_until_time) VALUES ' +
          '($1, $2, $3, $4, $5, $6, $7, $8);'
        db.query(eventQuery,
        [eventCode, eventName,eventTeam,eventDescription,eventLocation,eventDate,eventFromTime,eventUntilTime], function(queryError,result) {
          done();
          if (queryError) {
            res.send("There was an error saving the event. Please make sure that event code doesn't exist in the database.");
          } else {
            res.send("Event created successfully.")
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Deletes an event from the database
router.delete('/delete/:eventCode', function(req,res) {
  if(req.isAuthenticated()) {
    var eventCode = req.params.eventCode;
    // DELETE FROM event WHERE "event_code" = 2;
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        res.sendStatus(500);
      } else {
        db.query('DELETE FROM event WHERE event_code = $1;',[eventCode], function(queryError,result) {
          done();
          if (queryError) {
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// updates an existing event
router.put('/update', function(req,res) {
  if(req.isAuthenticated()) {
    var eventCode = req.body.eventCode;
    var eventName = req.body.eventName;
    var eventTeam = req.body.eventTeam;
    var eventDescription = req.body.eventDescription;
    var eventLocation = req.body.eventLocation;
    var eventDate = req.body.eventDate;
    var eventFromTime = req.body.eventFromTime;
    var eventUntilTime = req.body.eventUntilTime;
    // UPDATE event SET ... WHERE event_code = $2;
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        res.send(500);
      } else {
        db.query('UPDATE event SET event_name = $1, event_team = $2, event_description = $3, ' +
        'event_location = $4, event_date = $5, event_from_time = $6, event_until_time = $7 ' +
        ' WHERE event_code = $8;',
        [eventName,eventTeam,eventDescription,eventLocation,eventDate,eventFromTime,eventUntilTime,eventCode],
        function(queryError,result) {
          done();
          if (queryError) {
            res.send("There was a problem updating the event information.");
          } else {
            res.send("Event updated successfully.");
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// logs out all volunteers with time_out = NULL for a specific event
router.put('/logoutAll', function(req,res) {
  if(req.isAuthenticated()) {
    var eventCode = req.body.eventCode;
    var time = req.body.time;
    // UPDATE volunteer_hours SET time_out = '12:00' WHERE time_out is NULL AND event_id = 'MOA2017';
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        res.send(500);
      } else {
        db.query('UPDATE volunteer_hours SET time_out = $1 WHERE time_out is NULL AND event_id = $2;',
        [time,eventCode],
        function(queryError,result) {
          done();
          if (queryError) {
            res.sendStatus(500);
          } else {
            res.send(result);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// get route for starting events
router.get('/start/:code', function(req,res) {
  console.log("inside start/code");
  eventCode = req.params.code;
  // SELECT * FROM event WHERE event_code = '';
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log("inside pool.connect");
      res.sendStatus(500);
    } else {
      var eventQuery = 'SELECT * FROM event WHERE event_code = $1;';
      db.query(eventQuery,[eventCode],function(queryError,result) {
        console.log("inside event query");
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.send(result.rows[0]);
        }
      });
    }
  });
});

module.exports = router;
