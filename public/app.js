var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

// all environments
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));

// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

// Routes 
	require('./controller/routes.js')(app);

// demarrage du server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
