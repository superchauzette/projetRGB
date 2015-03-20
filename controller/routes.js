var utils = require("./../helpers/utils.js");
var cmdLed = require("./../service/commandeLed.js");
//var qtouchImpl = require("../../service/qtouchImpl.js");
var scenarioLight = require("./../service/scenarioLight.js");
var reveil = require("./../service/reveil.js");


module.exports = function(app) {

	app.post('/pwm', function(req, res){
		var red = utils.roundDecimal(req.body.red, 5);
		var green = utils.roundDecimal(req.body.green, 5);
		var blue = utils.roundDecimal(req.body.blue, 5);

		cmdLed.setRGB(red,green,blue);
		res.send(200, "vous avez mis la pin aux composantes rgb : ("+ red+","+green+","+blue+")");				
	});

	app.post('/pwmhsv', function(req, res){
		var h = utils.roundDecimal(req.body.h, 5);
		var s = utils.roundDecimal(req.body.s, 5);
		var v = utils.roundDecimal(req.body.v, 5);

		cmdLed.setHSV(h,s,v);
		res.send(200, "vous avez mis la pin aux composantes hsv : ("+ h+","+s+","+v+")");				
	});

	app.post('/pwmkelvin', function(req, res){
		var k = utils.roundDecimal(req.body.k, 5);
		cmdLed.setKelvin(k);
		res.send(200, "vous avez mis la lampe a la couleur correspondant a la temperature de : "+ k + " K");				
	});



	app.post('/sunrise', function(req, res){
		scenarioLight.sunrise();
		res.send(200, "lever du soleil");				
	});

	app.post('/sunset', function(req, res){
		scenarioLight.sunset();
		res.send(200, "coucher du soleil");				
	});

	app.post('/chimneyFire', function(req, res){
		scenarioLight.chimneyFire();
		res.send(200, "feu de cheiné");				
	});

	app.post('/stop', function(req, res){
		scenarioLight.stop();
		res.send(200, "stop");				
	});


	
	app.get('/reveil', function(req, res){
		res.json(200, reveil.get());				
	});

	app.post('/reveil', function(req, res){
		reveil.set(req.body.hour, req.body.day);
		res.send(200, "reveil a bien été programmé");				
	});

	app.post('/activerreveil', function(req, res){
		var bool = JSON.parse(req.body.on);
		reveil.active( bool );
		bool ? res.send(200, "reveil a bien été activé") : res.send(200, "reveil a bien été déactivé");				
	});

}