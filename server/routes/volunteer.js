console.log("inside volunteer.js");
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool');

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

});

// router.get('/:secondaryUser', function(req, res, next) {
//   console.log("inside secondaryUser ", req.params.secondaryUser);
//     pool.connect(function(errorConnectingToDB, client, done){
//       if(errorConnectingToDB){
//         console.log("Error Connecting to DB for secondaryUser List");
//         res.send(500);
//       } else {
//         client.query('SELECT "secondary_user"."first_name", "secondary_user"."last_name","secondary_user"."id"'  +
//         'FROM "secondary_user" JOIN "users" ON "secondary_user"."account_id" = "users"."id" '+
//         'AND "secondary_user"."account_id"= $1', [req.params.secondaryUser],
//         function(queryError, result){
//           console.log("GET SECONDARY success******", result);
//
//           done();
//           if(queryError){
//             console.log('Error making query for tasks on DB ');
//             res.send(500);
//           } else {
//             console.log('result in query: ', result);
//
//             res.send(result.rows);
//           }//end of 2nd else
//         });//end of client.query
//       }//end of 1st else
//     });//end of pool.connect
// });//end of .get

module.exports = router;
