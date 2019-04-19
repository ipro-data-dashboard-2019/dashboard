var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Gonna grab some notifications');
  request.post({url:'https://ipro-redcross.herokuapp.com/radioman/last/1'}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      res.send(err);
    }
    console.log('We got a response!');
    console.log(body);
    //console.log(httpResponse);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
