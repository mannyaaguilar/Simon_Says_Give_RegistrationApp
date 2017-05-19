console.log("inside volunteer.js");
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool');

// *****************
// *** STRUCTURE ***
// *****************
// CHECK-IN
// 1. GET by email, first_name, last_name
// 2. If not in "volunteer", POST email, first_name, last_name, under_18, birthdate
// 3. Waiver object info POST to "waiver" with appropriate fields
// 4. PUT to "volunteer" with has_signed_waiver, has_allowed_photos, parent_email
// 5. POST "volunteer_hours" with volunteer_id, event_id, date, time_in
// CHECK-OUT
// 1. ( GET by email, first_name, last_name )
// 6. PUT to "volunteer_hours" with time_out
// *****************

// Handles POST request with volunteer data
router.post('/', function(req, res, next) {
console.log("inside volunteer post: req.body = ", req.body);
// var user = req.body.user;
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
    console.log(saveVolunteer.dob);
    client.query("INSERT INTO volunteer (email, first_name, last_name, under_18, birthdate) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [saveVolunteer.email, saveVolunteer.first_name, saveVolunteer.last_name, saveVolunteer.under_18, saveVolunteer.birthdate],
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
});//end of post


module.exports = router;
