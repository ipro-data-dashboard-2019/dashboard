var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

//app.use(express.static(__dirname + '/node_modules')); // TODO Restrict which node modules can be accessed
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(path.join(__dirname, 'public'))); // Allow access to public folder

app.get('/', function (req, res, next) {
  console.log('Gonna grab some notifications');
  request.post({url: 'https://ipro-redcross.herokuapp.com/radioman/last/10'}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.send(err);
    }
    console.log('We got a response!');
    var notties = JSON.parse(body);
    //console.log(notties);
    res.render('index', {notifications: notties});
  });
});

// Catch 404 and sent to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function (socket) {
  console.log('Connect has been made');
});

server.listen(3000);
