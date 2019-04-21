var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Gonna grab some notifications');
  request.post({url:'https://ipro-redcross.herokuapp.com/radioman/last/10'}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.send(err);
    }
    console.log('We got a response!');
    var noties = JSON.parse(body);
    console.log(noties);
    res.render('index', { notifications: noties});
  });
});

module.exports = router;
