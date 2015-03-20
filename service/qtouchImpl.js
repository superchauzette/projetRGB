var qtouch = require("qtouch");
var Led = require("./commandeLed");

module.exports = {
	onPressUpKEY0:  onPressUpKEY0,
	balayeColor : balayeColor
};


var curseurColor=0;
var curseurLightness=0;
var curseur=0;
var ON = true;
var KEY0 = 0;
var KEY1 = 1;
var KEY2 = 2;
var boucle;

// Public
function onPressUpKEY0(){
  	qtouch.onPressUp(KEY0, function(){
        if(ON){ // sur le premier appui
            allumeProgress(5000);
            ON=false;
        }else{  // sur le second appui
            eteindProgress(5000);
            ON=true;
        }
    });
}

function balayeColor(){
	 qtouch.read(function(dataI2C){
        // sur le maintien du bouton 1 balaye les couleurs
        if(qtouch.BoutonAllumer(dataI2C,KEY1)){
            if(curseurColor>360) curseurColor=0; //remettre le curseur à 0
            Led.setHSV(curseurColor, 100, 100); // Le curseur va de 0 à 360
            curseurColor++;
        }
        
         // sur le maintien du bouton 2 balaye la luninosité
        if(qtouch.BoutonAllumer(dataI2C,KEY2)){
            if(curseurLightness>100) curseurLightness=0;   //remettre le curseur à 0
            Led.setHSV(0, 0, curseurLightness); // Le curseur va de 0 à 100
            curseurLightness++;      
        }
    });
}

//Private
function allumeProgress(tmpAlumage){
    clearInterval(boucle); 
    boucle = setInterval(function() {  // on boucle pour augmenter la luminosité
        if(curseur>100){ // Pour arrêter la boucle, le curseur va de 0 à 100, supérieur sinon il ne s'arreter pas à 100
            clearInterval(boucle);  
        }
        Led.setHSV(0, 0, curseur);  
        curseur++;
      },tmpAlumage/100);
}

function eteindProgress(tmpAlumage){
    clearInterval(boucle);  
    boucle = setInterval(function() {  // on boucle pour augmenter la luminosité
        if(curseur<0){ // Pour arrêter la boucle, le curseur va de 0 à 100, supérieur sinon il ne s'arreter pas à 100
            clearInterval(boucle);  
        }
        Led.setHSV(0, 0, curseur);  
        curseur--;
      },tmpAlumage/100);
}
