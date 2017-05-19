var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool');

//Gets matching volunteers from database
router.post('/', function(req, res) {

  pool.connect(function(error, db, done){
    if(error) {
      console.log("error connecting to the database.");
      res.send(500);

    } else {
      db.query("SELECT volunteer.first_name, volunteer.last_name, volunteer.email, volunteer_id FROM volunteer JOIN volunteer_hours ON volunteer.id = volunteer_hours.volunteer_id WHERE volunteer.first_name = $1 OR volunteer.last_name = $2 OR volunteer.email = $3;", [req.body.first_name, req.body.last_name, req.body.email], function(queryError, result){
        done();
        if (queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.send(result.rows);

        } //ends else
      }); //ends db query
    } //ends else
  }); //ends pool.connect
}); //ends router.post

//PUT Route that updates the checkout time of chosen volunteer record(s)
router.put('/', function(req, res){

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      //NEED TO UPDATE QUERY BELOW
      // db.query("" + id, [], function(queryError, result){
      //   done();
      //   if(queryError) {
      //     console.log('Error making query.');
      //     res.sendStatus(500);
      //   } else {
      //     console.log(result);
      //     res.sendStatus(201);
      //   } //ends else
      // }); //ends db query
    } //ends else
  }); //ends pool.connect
}); //ends router

module.exports = router;
