var express = require('express');
var router = express.Router();
var csv = require('csvtojson')
var pool = require('../modules/pool');

// Handles POST request with new user data
router.post('/upload', function(req, res, next) {

  console.log('Converting to JSON');
  csvString = req.body.fileContent;
  csv({noheader:false})
  .fromString(csvString)
  .on('json',function(json) {
    console.log(json);
  })
  .on('done',function() {
    console.log('Finished conversion');
  })





  // var saveUser = {
  //   username: req.body.username,
  //   password: encryptLib.encryptPassword(req.body.password)
  // };
  // console.log('new user:', saveUser);
  //
  // pool.connect(function(err, client, done) {
  //   if(err) {
  //     console.log("Error connecting: ", err);
  //     next(err);
  //   }
  //   client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
  //     [saveUser.username, saveUser.password],
  //       function (err, result) {
  //         client.end();
  //
  //         if(err) {
  //           console.log("Error inserting data: ", err);
  //           next(err);
  //         } else {
  //           res.redirect('/');
  //         }
  //       });
  // });
  res.send('From server: /upload');

});


module.exports = router;
