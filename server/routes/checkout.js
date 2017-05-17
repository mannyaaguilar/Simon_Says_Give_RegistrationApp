var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool');

//Gets matching volunteers from database
router.get('/', function(req, res) {

  pool.connect(function(error, db, done){
    if(error) {
      console.log("error connecting to the database.");
      res.send(500);

    } else {
      console.log('connected to get check out route');
      // db.query('', function(queryError, result){
      //   done();
      //   if (queryError) {
      //     console.log('Error making query.');
      //     res.send(500);
      //   } else {
      //
      //     res.send(result.rows);
      //
      //   } //ends else
      // }); //ends db query
    } //ends else
  }); //ends pool.connect
}); //ends router.get

module.exports = router;
