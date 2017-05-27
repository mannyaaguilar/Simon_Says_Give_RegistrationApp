var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool');

//-*****************
//-*** STRUCTURE ***
//-*****************
//-CHECK-IN
//X1. POST with email, first_name, last_name to SELECT from DB
//X2. POST email, first_name, last_name, under_18, birthdate (if not in "volunteer")
//X3. POST waiver object info to "waiver" with appropriate fields
//X4. \--> PUT to "volunteer" with has_signed_waiver, has_allowed_photos, parent_email
//X5. POST "volunteer_hours" with volunteer_id, event_id, date, time_in
//-*****************

// POST with email, first_name, last_name to SELECT from DB ("volunteer")
// Then POST email, first_name, last_name, under_18, birthdate (if not in DB)
router.post('/initial', function(req, res, next) {
  var volGiven = req.body;

  pool.connect(function(err, client, done) {
    if ( err ) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("SELECT * FROM volunteer WHERE email = $1 AND " +
      "first_name = $2 AND last_name = $3;",
      [volGiven.email, volGiven.first_name, volGiven.last_name],
        function (err, result) {
          done();

          if ( err ) {
            console.log("Error with volunteer query: ", err);
            next(err);
          }
          else if ( result.rows.length === 0 ) {
            client.query("INSERT INTO volunteer (email, first_name, last_name, " +
              "under_18, birthdate) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
              [volGiven.email, volGiven.first_name, volGiven.last_name,
                volGiven.under_18, volGiven.birthdate],
                function (err, result) {
                  done();

                  if ( err ) {
                    console.log("Error adding volunteer: ", err);
                    next(err);
                  }
                  else {
                    res.send(result.rows);
                  }
                });//end of client.query
          }
          else {
            res.send(result.rows);
          }
        });//end of client.query
  });//end of pg.connect
});//end of POST

// POST waiver object info to "waiver" with appropriate fields
// PUT to "volunteer" with has_signed_waiver, has_allowed_photos, parent_email
// POST "volunteer_hours" with volunteer_id, event_id, date, time_in
router.post('/complete', function(req, res, next) {
  console.log("in server complete post!");
  var signedAdult,
      signedYouth,
      liabilitySigned,
      waiverInfo;

signedAdult = false;
  if ( req.body.dateTopAdult && req.body.nameTopAdult && req.body.agreedAdult &&
    req.body.nameBottomAdult && req.body.dateBottomAdult) {
    signedAdult = true;
  }

signedYouth = false;
  if ( req.body.dateTopYouth && req.body.nameTopYouth &&
    req.body.guardianTopYouth && req.body.agreedYouth &&
    req.body.nameBottomYouth && req.body.dateBottomVolYouth &&
    req.body.guardianBottomYouth && req.body.dateBottomGuardYouth ) {
    signedYouth = true;
  }

console.log("signedAdult: ", signedAdult);
console.log("signedYouth: ", signedYouth);
  liabilitySigned = signedAdult || signedYouth;

  waiverInfo = {
    //Adult waiver
    adult_lw_signature: req.body.nameBottomAdult || null,
    adult_lw_date: req.body.dateBottomAdult || null,
    //Youth waiver
    minor_lw_guardian_name: req.body.guardianTopYouth || null,
    minor_lw_signature: req.body.nameBottomYouth || null,
    minor_lw_date: req.body.dateBottomYouth || null,
    minor_lw_guardian_signature: req.body.guardianBottomYouth || null,
    //Photo waiver
    pw_signature: req.body.nameBottomPhoto || null,
    pw_date: req.body.dateBottomPhoto || null,
    pw_guardian_signature: req.body.guardianBottomPhoto || null,
    //For the PUT
    has_signed_waiver: liabilitySigned,
    has_allowed_photos: req.body.agreedPhoto, //required
    parent_email: req.body.guardianEmailYouth || null,
    volunteer_id: req.body.volunteerID, //required
    //For the volunteer_hours POST
    event_id: req.body.event_id, //required
    date: req.body.date, //required
    time_in: req.body.time_in //required
  };

  pool.connect(function(err, client, done) {
    if ( err ) {
      console.log("Error connecting: ", err);
      next(err);
    }
    console.log("waiverInfo: ", waiverInfo);
    client.query("WITH volunteer_hours AS (INSERT INTO waiver " +
      "(volunteer_id, adult_lw_signature, adult_lw_date, minor_lw_guardian_name, " +
      "minor_lw_signature, minor_lw_date, minor_lw_guardian_signature, " +
      "pw_signature, pw_date, pw_guardian_signature) VALUES ($1, $2, $3, $4, $5, " +
      "$6, $7, $8, $9, $10) RETURNING id) UPDATE volunteer SET " +
      "has_signed_waiver = $11, has_allowed_photos = $12, parent_email = $13 " +
      "WHERE id = $14;",
      [waiverInfo.volunteer_id, waiverInfo.adult_lw_signature,
        waiverInfo.adult_lw_date, waiverInfo.minor_lw_guardian_name,
        waiverInfo.minor_lw_signature, waiverInfo.minor_lw_date,
        waiverInfo.minor_lw_guardian_signature, waiverInfo.pw_signature,
        waiverInfo.pw_date, waiverInfo.pw_guardian_signature,
        waiverInfo.has_signed_waiver, waiverInfo.has_allowed_photos,
        waiverInfo.parent_email, waiverInfo.volunteer_id],
        function (err, result) {
          done();

          if ( err ) {
            console.log("Error inserting data on waiver table: ", err);
            next(err);
          }
          else {
            console.log("server complete post worked!");
            client.query("INSERT INTO volunteer_hours (volunteer_id, event_id," +
              " date, time_in) VALUES ($1, $2, $3, $4)",
              [waiverInfo.volunteer_id, waiverInfo.event_id, waiverInfo.date,
                waiverInfo.time_in],
                function (err, result) {
                  done();

                  if ( err ) {
                    console.log("Error inserting to volunteer_hours: ", err);
                    next(err);
                  }
                  else {
                    console.log("server complete second post worked!");
                    res.send(result.rows);
                  }
                });//end of client.query
          }
        });//end of client.query
  });//end of pg.connect
});//end of POST

module.exports = router;
