var converter = require("color-convert");

module.exports = {
	roundDecimal 			: roundDecimal,
	colorTemperatureToRGB 	: colorTemperatureToRGB,
	colorTemperatureToHSV 	: colorTemperatureToHSV
};

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

function colorTemperatureToRGB(kelvin){

    var temp = kelvin / 100;

    var red, green, blue;

    if( temp <= 66 ){ 

        red = 255; 
        
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;

        
        if( temp <= 19){

            blue = 0;

        } else {

            blue = temp-10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;

        }

    } else {

        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );

        blue = 255;

    }

    	r = clamp(red,   0, 255);
        g = clamp(green, 0, 255);
        b = clamp(blue,  0, 255);

    return [r, g, b];
}

function colorTemperatureToHSV(kelvin){
	return converter.rgb2hsv( colorTemperatureToRGB(kelvin) );
}

function clamp( x, min, max ) {
    if(x<min){ return min; }
    if(x>max){ return max; }

    return x;
}