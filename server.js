// need express
var express  = require('express');
// express instance
var app = express();
// body parser, use req.body
var bodyParser  = require('body-parser');
// log msg
var morgan = require('morgan');
// db
var mongoose = require('mongoose');

// web token
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// the db
var config = require('./config'); // get our config file

// user model
var User = require('./app/models/user'); // get our mongoose model

// port 8080
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
// mongo connect to db with username and password

//mongoose.connect(config.database); // connect to database


// express app can set variable....
app.set('nodejs_jwt', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
// express app can use body parser
// extend, false, cannot parse nested object.
app.use(bodyParser.urlencoded({ extended: false }));
// express app can use json
app.use(bodyParser.json());

// express app can use morgon (dev)
// use morgan to log requests to the console
app.use(morgan('dev'));

// default -------------------------------------------
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// set up user -------------------------------
// app get, setup
// req, res
app.get('/setup', function(req, res) {
  // new user obj
  // create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  // save it
  // save the sample user
  nick.save(function(err) {
    // err
    if (err) throw err;
    // log
    console.log('User saved successfully');
    // res json
    res.json({ success: true });
  });
});


// API ROUTES -------------------
// get an instance of the router for api routes
// express router === api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:8080/api/)
// api routes, get /
// req, res
// /api/
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// /api/users
// req, res
// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  // User find all
  // callback, err, back users
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// apply the routes to our application with the prefix /api
//
app.use('/api', apiRoutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
