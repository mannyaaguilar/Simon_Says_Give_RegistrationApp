var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool');

//POST gets matching volunteers from database
router.post('/', function(req, res) {

  pool.connect(function(err, client, done) {
    if ( err ) {
      next(err);
    }
    client.query("SELECT * FROM event WHERE event_code = $1;",
    [req.body.event_code],
    function(err, result) {
      if ( err ) {
        next(err);
      }
      else if ( result.rows.length !== 0 ) {
        client.query("SELECT volunteer.first_name, volunteer.last_name, " +
        "volunteer.email, volunteer_hours.id FROM volunteer JOIN volunteer_hours " +
        "ON volunteer.id = volunteer_hours.volunteer_id WHERE volunteer_hours.event_id " +
        "= $4 AND (volunteer.first_name " + "ILIKE $1 OR volunteer.last_name ILIKE $2 " +
        "OR volunteer.email ILIKE $3) AND volunteer_hours.time_out IS null;",
        [req.body.first_name, req.body.last_name, req.body.email, req.body.eventID],
        function(queryError, result){
          done();
          if (queryError) {
            console.log('Error making query.');
            res.send(500);
          }
          else {
            res.send(result.rows);
          } //ends else
        }); //ends db query
      } //ends else
    }); //ends pool.connect
  });
}); //ends router.post


//PUT Route that updates the checkout time of chosen volunteer record(s)
router.put('/:ids/:timeout', function(req, res){

  pool.connect(function(err, client, done) {
    if ( err ) {
      next(err);
    }
    client.query("SELECT * FROM event WHERE event_code = $1;",
    [req.body.event_code],
    function(err, result) {
      if ( err ) {
        next(err);
      }
      else if ( result.rows.length !== 0 ) {
        client.query("UPDATE volunteer_hours SET time_out = '" + req.params.timeout +
        "' WHERE id IN (" + req.params.ids + ");", function(queryError, result){
          done();
          if(queryError) {
            console.log('Error making query.');
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(201);
          } //ends else
        }); //ends db query
      } //ends else
    }); //ends pool.connect
  });
}); //ends router

module.exports = router;
