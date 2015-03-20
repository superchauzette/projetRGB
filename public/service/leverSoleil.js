var cmdLed = require("./commandeLed.js");
var utils = require("./../helpers/utils.js");

module.exports = {
	sunrise : sunrise,
	sunset : sunset,
	chimneyFire: chimneyFire,
	stop : stop
};

var myboucle = null;

// Public
function sunrise(){
	stop();
	var k = 1000;
	myboucle = setInterval(function(){
		
		if(k>5500){
			stop();
			console.log('fin de la boucle');
		}

		var rgb = utils.colorTemperatureToRGB(k);
		cmdLed.setRGB(rgb[0],rgb[1],rgb[2]);

		k=k+5;
	}, 10);
}

function sunset(){
	stop();
	var k = 5500;
	myboucle = setInterval(function(){
		
		if(k>1000){
			stop();
			console.log('fin de la boucle');
		}

		var rgb = utils.colorTemperatureToRGB(k);
		cmdLed.setRGB(rgb[0],rgb[1],rgb[2]);

		k=k-5;
	}, 10);
}

function chimneyFire(){
	stop();
	var i = 0;
	myboucle = setInterval(function(){
		console.log(i)
		if(i>5){
			clearTimeout(myboucle);
			stop();
			console.log('fin de la boucle');
		}

		var k = ((Math.random() * 1000) + 1000); // Random de la température de couleur entre 1000 et 2000
		var hsv = utils.colorTemperatureToHSV(k);
		hsv[2] = ((Math.random() * 40) + 60); //Random de la la luminosité entre 60 et 100
		cmdLed.setHSV( hsv[0] , hsv[1], hsv[2] );

		i=i+1;
	}, 10);
}

function stop(){
	if (myboucle != null) clearTimeout(myboucle);
}