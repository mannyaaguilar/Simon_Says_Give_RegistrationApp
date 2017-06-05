var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var csv = require('./routes/csv');
var volunteer = require('./routes/volunteer');
var checkout = require('./routes/checkout');
var ssgEvent = require('./routes/event');
var ssgHours = require('./routes/hours');

// Limit set to 50mb to avoid error on large cvs files
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'simonsaysgivesecretssg',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/ssgHours', ssgHours);
app.use('/ssgEvent', ssgEvent);
app.use('/volunteer', volunteer);
app.use('/checkout', checkout);
app.use('/register', register);
app.use('/user', user);
app.use('/csv', csv);

// Login error response
app.get('/error', function(req, res) {
  res.send({message: 'Unable to log in. Please try again.'});
});

app.use('/*', index);

// App Set //
app.set('port', (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
