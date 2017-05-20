var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool');

//-*****************
//-*** STRUCTURE ***
//-*****************
//-CHECK-IN
//X1. GET by email, first_name, last_name
//X2. POST email, first_name, last_name, under_18, birthdate (if not in "volunteer")
//X3. POST waiver object info to "waiver" with appropriate fields
//X4. \--> PUT to "volunteer" with has_signed_waiver, has_allowed_photos, parent_email
//X5. POST "volunteer_hours" with volunteer_id, event_id, date, time_in
//-*****************


// GET by email, first_name, last_name
router.get('/', function(req, res, next) {
  console.log("inside volunteer GET: req.body = ", req.body);
  var newVolunteer = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("SELECT * FROM volunteer WHERE (email = $1 AND " +
      "first_name = $2 AND last_name = $3);",
      [newVolunteer.email, newVolunteer.first_name, newVolunteer.last_name],
        function (err, result) {
          done();
          console.log("success in GET from volunteer table", result);
          if(err) {
            console.log("Error getting data from volunteer table: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });//end of client.query
  });//end of pg.connect
});//end of GET


// POST email, first_name, last_name, under_18, birthdate
router.post('/', function(req, res, next) {
  console.log("inside volunteer POST: req.body = ", req.body);
  var saveVolunteer = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    under_18: req.body.under_18,
    birthdate: req.body.birthdate
  };

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("INSERT INTO volunteer (email, first_name, last_name, " +
      "under_18, birthdate) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [saveVolunteer.email, saveVolunteer.first_name, saveVolunteer.last_name,
        saveVolunteer.under_18, saveVolunteer.birthdate],
        function (err, result) {
          done();
          console.log("success in INSERT to volunteer table", result);
          if(err) {
            console.log("Error inserting data on volunteer table: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });//end of client.query
  });//end of pg.connect
});//end of POST


// POST to "waiver" table
router.post('/', function(req, res, next) {
  console.log("inside waiver POST: req.body = ", req.body);
  let signedAdult,
      signedYouth,
      liabilitySigned,
      saveWaiver;

  signedAdult = req.body.dateTopAdult && req.body.nameTopAdult &&
                req.body.agreedAdult && req.body.nameBottomAdult &&
                req.body.dateBottomAdult;

  signedYouth = req.body.dateTopYouth && req.body.nameTopYouth &&
                req.body.guardianTopYouth && req.body.agreedYouth &&
                req.body.nameBottomYouth && req.body.dateBottomVolYouth &&
                req.body.guardianBottomYouth && req.body.dateBottomGuardYouth;

  liabilitySigned = signedAdult || signedYouth;

  saveWaiver = {
    //Adult waiver
    adult_lw_signature: req.body.nameBottomAdult || "null",
    adult_lw_date: req.body.dateBottomAdult || "3000-12-01",
    //Youth waiver
    minor_lw_guardian_name: req.body.guardianTopYouth || "null",
    minor_lw_signature: req.body.nameBottomYouth || "null",
    minor_lw_date: req.body.dateBottomYouth || "3000-12-01",
    minor_lw_guardian_signature: req.body.guardianBottomYouth || "null",
    //Photo waiver
    pw_signature: req.body.nameBottomPhoto || "null",
    pw_date: req.body.dateBottomPhoto || "3000-12-01",
    pw_guardian_signature: req.body.guardianBottomPhoto || "null",
    //For the PUT
    has_signed_waiver: liabilitySigned,
    has_allowed_photos: req.body.agreedPhoto,
    parent_email: req.body.guardianEmailYouth || "null",
    volunteer_id: req.body.volunteerID
  };

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("WITH volunteer_hours AS (INSERT INTO waiver " +
      "(adult_lw_signature, adult_lw_date, minor_lw_guardian_name, " +
      "minor_lw_signature, minor_lw_date, minor_lw_guardian_signature, " +
      "pw_signature, pw_date, pw_guardian_signature) VALUES ($1, $2, $3, $4, " +
      "$5, $6, $7, $8, $9) RETURNING id) UPDATE volunteer SET " +
      "(has_signed_waiver, has_allowed_photos, parent_email) VALUES " +
      "($10, $11, $12) WHERE id = $13;",
      [saveWaiver.adult_lw_signature, saveWaiver.adult_lw_date,
        saveWaiver.minor_lw_guardian_name, saveWaiver.minor_lw_signature,
        saveWaiver.minor_lw_date, saveWaiver.minor_lw_guardian_signature,
        saveWaiver.pw_signature, saveWaiver.pw_date,
        saveWaiver.pw_guardian_signature, saveWaiver.has_signed_waiver,
        saveWaiver.has_allowed_photos, saveWaiver.parent_email,
        saveWaiver.volunteer_id],
        function (err, result) {

          //PUT

          done();
          console.log("successful INSERT to 'waiver' and UPDATE to 'volunteer': ", result);
          if(err) {
            console.log("Error inserting data on waiver table: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });//end of client.query
  });//end of pg.connect
});//end of POST


// POST volunteer_id, event_id, date, time_in
router.post('/', function(req, res, next) {
  console.log("inside volunteer_hours POST: req.body = ", req.body);
  var saveHours = {
    volunteer_id: req.body.id,
    event_id: req.body.event_id,
    date: req.body.date,
    time_in: req.body.time
  };

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("INSERT INTO volunteer_hours (volunteer_id, event_id, date, " +
      "time_in) VALUES ($1, $2, $3, $4)",
      [saveHours.volunteer_id, saveHours.event_id, saveHours.date,
        saveHours.time_in],
        function (err, result) {
          done();
          console.log("success in INSERT to volunteer_hours table", result);
          if(err) {
            console.log("Error inserting data on volunteer_hours table: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });//end of client.query
  });//end of pg.connect
});//end of POST

module.exports = router;
