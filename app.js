var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){

	res.sendFile('app.html', { root: path.join(__dirname, 'public') });

});

// error handler
app.use(function(err, req, res, next) {

  if(err){
    console.log('err ', err);
    res.status(500).send({
			error: true,
			message: 'Err-EX273EX723EX71REQ: Oops! Something went wrong :( !, please try again later'
		});
  }
});

app.listen(3000);