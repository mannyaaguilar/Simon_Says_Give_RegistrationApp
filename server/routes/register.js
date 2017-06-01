var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var pool = require('../modules/pool');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    email: req.body.email,
    role : req.body.role
  };
  pool.connect(function(err, client, done) {
    if(err) {
      next(err);
    }
    client.query("INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING id",
      [saveUser.username, saveUser.password,saveUser.role, saveUser.email],
        function (err, result) {
          client.end();
          if(err) {
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });
});


module.exports = router;
