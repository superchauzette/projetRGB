var express = require('express');
var http = require('http');
var path = require('path');
var piblaster = require("pi-blaster.js");
var cmdLed = require("./commandeLed.js");
var qtouchImpl = require("./qtouchImpl.js");

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

///*******************************//

app.get('/pwm', function(req, res){
	var red = roundDecimal(req.query.red/255, 5) ;
	var green = roundDecimal(req.query.green/255, 5) ;
	var blue = roundDecimal(req.query.blue/255, 5) ;

	cmdLed.setRGB(red,green,blue);
	res.send(200, "vous avez mis la pin aux composantes rgb : ("+ red+","+green+","+blue+")");				
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}
