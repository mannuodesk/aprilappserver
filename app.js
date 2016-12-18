var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cors = require('cors');
var routes = require('./routes/index');
var users = require('./routes/users');
//var socketchat = require('./routes/socketchat');
var groups = require('./routes/groups');
var blocks = require('./routes/blocks');
var phrases = require('./routes/phrases');
var usercode = require('./routes/usercode');
var responsemessages = require('./routes/responsemessages');
var multer = require('multer');
var app = express();
//app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(multer({dest:'./public/images/'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use('/', routes);
app.use('/users', users);
app.use('/groups', groups);
app.use('/blocks', blocks);
app.use('/phrases', phrases);
app.use('/usercode', usercode);
app.use('/responsemessage', responsemessages);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
