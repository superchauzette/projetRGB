var qtouch = require("qtouch");

// sur l'appui du bouton 0 KEY0
qtouch.onPressUp(0, function(){
  console.log("on Press Up");
});

// sur le relachement du bouton 0 KEY0
qtouch.onPressDown(0, function(){
  console.log("on Press Down");
});

//lecture en continu des valeurs sur bus I2C
qtouch.read(function(dataI2C){
  //console.log(dataI2C);

  // sur le maintien du bouton 1 KEY1
  if(qtouch.BoutonAllumer(dataI2C,1)){
    console.log("Button 1 on");
  }else{
    console.log("Button 1 off");
  }

   // sur le maintien du bouton 2 KEY2
  if(qtouch.BoutonAllumer(dataI2C,2)){
    console.log("Button 2 on");
  }
});