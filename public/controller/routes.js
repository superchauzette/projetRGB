var utils = require("./../helpers/utils.js");
var cmdLed = require("./../service/commandeLed.js");
//var qtouchImpl = require("../../service/qtouchImpl.js");
var leverSoleil = require("./../service/leverSoleil.js");
var reveil = require("./../service/reveil.js");


module.exports = function(app) {

	app.get('/pwm', function(req, res){
		var red = utils.roundDecimal(req.query.red, 5);
		var green = utils.roundDecimal(req.query.green, 5);
		var blue = utils.roundDecimal(req.query.blue, 5);

		cmdLed.setRGB(red,green,blue);
		res.send(200, "vous avez mis la pin aux composantes rgb : ("+ red+","+green+","+blue+")");				
	});

	app.get('/pwmhsv', function(req, res){
		var h = utils.roundDecimal(req.query.h, 5);
		var s = utils.roundDecimal(req.query.s, 5);
		var v = utils.roundDecimal(req.query.v, 5);

		cmdLed.setHSV(h,s,v);
		res.send(200, "vous avez mis la pin aux composantes hsv : ("+ h+","+s+","+v+")");				
	});

	app.get('/pwmkelvin', function(req, res){
		var k = utils.roundDecimal(req.query.k, 5);
		cmdLed.setKelvin(k);
		res.send(200, "vous avez mis la lampe a la couleur correspondant a la temperature de : "+ k + " K");				
	});



	app.get('/sunrise', function(req, res){
		leverSoleil.sunrise();
		res.send(200, "lever du soleil");				
	});

	app.get('/sunset', function(req, res){
		leverSoleil.sunset();
		res.send(200, "coucher du soleil");				
	});

	app.get('/chimneyFire', function(req, res){
		leverSoleil.chimneyFire();
		res.send(200, "feu de cheiné");				
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