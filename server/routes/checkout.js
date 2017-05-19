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
      console.log('connected to get checkout get route');
      console.log('req.body in get: ', req.body);
      //NEED TO UPDATE QUERY BELOW
      db.query('', function(queryError, result){
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
}); //ends router.get

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
