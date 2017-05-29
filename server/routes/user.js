var express = require('express');
var router = express.Router();
var passport = require('passport');
var pool = require('../modules/pool');
var Chance = require('chance');
var chance = new Chance();
var encryptLib = require('../modules/encryption');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'simon.says.give.mail@gmail.com', //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
        pass: 'MOA2017HFS2017'  //YOUR GMAIL PASSWORD, DO NOT HOST THIS INFO ON GITHUB!
    }
});

router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    //prepare an object = { }
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logout();
  res.sendStatus(200);
});

// creates and sends a code to reset the password
router.post('/forgotpassword', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('forgotpassword route', req.body);
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
      res.sendStatus(500);
    } else {
      var code = chance.string({pool: 'abcdefghijklmnopqrstuvwxyz1234567890', length:20});
      // You 'should' check for collision
      var baseUrl = 'http://localhost:5000/' // Or environment variable
      console.log('Password reset link: ' + baseUrl + '#/confirmreset/' + code );
      var emailMessage = 'Password reset link: ' + baseUrl + '#/confirmreset/' + code;
      // TODO: mail out that link with node mailer NOT to client.

      var userQuery = 'SELECT email FROM users WHERE username = $1';
      db.query(userQuery,[req.body.username], function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error making query',queryError);
          res.sendStatus(500);
        } else {
          console.log("email result:",result);
          var accountEmail = result.rows[0].email;
          console.log('email should be',accountEmail);
          var mailOptions = {
              //example: from: '"Scott" scott@primeacademy.io',
              from: '"Simon Says Give" simon.says.give.mail@gmail.com', // sender address -> //YOUR GMAIL USER HERE IN STRING + email not in string! -> EXAMPLE@gmail.com
              to: accountEmail, // list of receivers
              subject: 'Password Reset Link', // Subject line
              text: emailMessage, // plain text body
              html: '<b>' + emailMessage + '</b>' // html body
          };

          transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
          });

          var userQuery = 'UPDATE users SET code = $1 WHERE username = $2';
          db.query(userQuery,[code, req.body.username], function(queryError,result) {
            done();
            if (queryError) {
              console.log('Error making query',queryError);
              res.sendStatus(500);
            } else {
              res.send("Code sent successfully.")
              // res.sendStatus(201); // succesful insert status
            }
          });
        }
      });
    }
  })
});

// resets password
router.put('/resetpassword', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('resetpassword route', req.body);

  pool.connect(function(errorConnectingToDatabase,db,done) {
    // TODO: Should also check expiration here and
    // throw 500 if expired.
    var expired = false;
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
      res.sendStatus(500);
    } else if(expired) {
      res.sendStatus(500);
    } else {
      var password = encryptLib.encryptPassword(req.body.password);

      var userQuery = 'UPDATE users SET password = $1 WHERE username = $2';
      db.query(userQuery,[password, req.body.username], function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error making query',queryError);
          res.sendStatus(500);
        } else {
          res.send("Password updated successfully.")
          // res.sendStatus(201); // succesful insert status
        }
      });
    }
  });
});


module.exports = router;
