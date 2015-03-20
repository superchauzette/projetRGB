var converter = require("color-convert")();
var piblaster = require("pi-blaster.js");// Pour la commande des leds
var utils = require("./../helpers/utils.js");

module.exports = {
	setRGB : setRGB,
	setHSV : setHSV,
	setKelvin : setKelvin
};

// Limitations 
var lim_r = 0.82;
var lim_g = 0.70;
var lim_b = 0.78;

// allumer la LED avec les composantes r,g,b entrée en parametres
function setRGB(r,g,b){
	(r > 255) ? 255 : (r < 0) ? 0 : piblaster.setPwm(22, r*lim_r/255);
	(g > 255) ? 255 : (g < 0) ? 0 : piblaster.setPwm(23, g*lim_g/255);
	(b > 255) ? 255 : (b < 0) ? 0 : piblaster.setPwm(24, b*lim_b/255);
}

// Conversion hsv vers RGB  et allume la lampe au valeurs données en parametres
function setHSV(h, s, v){
	var convrgb = converter.hsv(h, s, v).rgb();
	setRGB(convrgb[0],convrgb[1],convrgb[2]);
}

function setKelvin(k){
	var rgb = utils.colorTemperatureToRGB(k);
	setRGB(rgb[0],rgb[1],rgb[2]);
}