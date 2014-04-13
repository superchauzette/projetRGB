var converter = require("color-convert")();
var piblaster = require("pi-blaster.js");// Pour la commande des leds

var lim_r = 0.82;// Limitations 
var lim_g = 0.70;
var lim_b = 0.78;

// allumer la LED avec les composantes r,g,b entrée en parametres
function setRGB(r,g,b){
	piblaster.setPwm(22, r*lim_r/255);
	piblaster.setPwm(23, g*lim_g/255);
	piblaster.setPwm(24, b*lim_b/255);
}

function setHSV(h, s, v){// Conversion hsv vers RGB  et allume la lampe au valeurs données en parametres
	var convrgb = converter.hsv(h, s, v).rgb();
	setRGB(convrgb[0],convrgb[1],convrgb[2]);
}

//les exports
exports.setRGB = setRGB;
exports.setHSV = setHSV;