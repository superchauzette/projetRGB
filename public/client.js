$(function() {

	var input = $('#input-a');
	var $switchOnOff = $('#switchOnOff');
	var widthTotal = $('#colorbackground').width();
	var x = 0;
	var v = 50;
	var sunrise = true;


	$("#lumisosite").on("change", function(d){	
		v = $(this)[0].value;	
		pwmXSV( x, 100, v );
	});	

	$("#btn-on").on("click", function(){
		$('#lumisosite')[0].value = 100;
		pwmXSV(0,0,100);
	});

	$("#btn-off").on("click", function(){
		$('#lumisosite')[0].value = 0;
		pwmXSV(0,0,0);
	});	

	$('#btn-leverSoleil').on('click',function(){
		if(sunrise){
			leverSoleil();
			$(this).text("SUNSET");
			sunrise = false;
		}else{
			coucherSoleil();
			$(this).text("SUNRISE");
			sunrise = true;
		}
	});

	// picker color
	$('#draggable').draggable({
		containment: ".colorbackground",
		stop: function(d) {
			var widthTotal = $('#colorbackground').width();
			x = Math.round( (d.clientX/widthTotal)*100 );
   			pwmXSV(x, 100 , v);
 	 	}
 	});


//*********************************************************//
	
	$("#btn-amb_zen").on("click", function(){ // ZEN : Voir ce qu'on peut faire en terme de couleur, la plus reposante, tester toutes les ambiances!
	
	});
	
	$("#btn-amb_bulb").on("click", function(){ //Light Bulb : 2400°K à 3000°K
		pwmKelvin(3000);
	});

	$("#btn-amb_sun").on("click", function(){ // Sun Light Soleil au zénith (5800 k) : Lumière du jour
		pwmKelvin(5800);
	});
	
	$("#btn-amb_blue").on("click", function(){ //Lumière blanche bleuté (Ciel nuageux : 7000°K à 9000°K, Ciel polaire : 10000°K
		pwmKelvin(10000);
	});
	
	$("#btn-amb_sunlow").on("click", function(){ // Soleil à l'horizon (entre 2000 k et 3000 k)
		pwmKelvin(2000);
	});

	$("#btn-amb_fire").on("click", function(){ // fire (1500 k), lumière tremblotante
		chimneyFire();
	});

	$("#zoneStop").on("click",function(){
		stop();
	});



//****************************************************************************//	

	//input.clockpicker('show').clockpicker('toggleView', 'minutes');
	//input.clockpicker('show').clockpicker('toggleView', 'hours');

//init
	getInfoReveil().then(function(data){

		// init le switchOnOff
		$switchOnOff.prop("checked", data.on);

		// init heure
		input.val( data.hour );

		// init jour	
		var dayInit = data.day.replace("0","7"); // dimanche
		var dayFormater = [];
		dayInit.split(",").forEach(function(d){
			dayFormater.push( parseInt(d) )
		}); 
		$('input:checkbox').each(function(i){
			if( dayFormater.indexOf(i) >= 0 ){
				$($('input:checkbox')[i]).prop("checked","checked"); 
			}
		});
	});

// ON/OFF Reveil
	$switchOnOff.on("change",function(d){										
		activeReveil($(this).prop("checked"))
	});

//  picker hour
	input.clockpicker({
	    autoclose: true,
	    vibrate : true,
        afterDone: function() {
            mettreReveil( input.val(), listday() );
        }
	});
	
// picker day
	$('#Jours input:checkbox').on("change",function(d){	
		console.log( listday() )									
		mettreReveil( input.val(), listday() );
	});


	function listday(){
		var dayCocher =[];
		$('input:checkbox:checked').each(function(d) {	
			if( $(this).attr("tonumber") !== undefined ){
				dayCocher.push( $(this).attr("tonumber") );
			}			
		});
		return dayCocher;
	}

});


//***********************************************************//	

function pwm(red, green, blue){
    return $.post( "/pwm", {red : red, green : green, blue: blue} )
	    .then(function( data ) {
	       console.log(data)  
	    });
}

function pwmHSV(h,s,v){
	return $.post( "/pwmhsv", {h : h, s : s, v: v} )
	    .then(function( data ) {
	       console.log(data)  
	});
}

function pwmXSV(x,s,v){
	return pwmHSV( x*360/100 , s, v);
}

function pwmKelvin(k){
	return $.post( "/pwmkelvin", {k : k} )
	    .then(function( data ) {
	       console.log(data)  
	});
}


function leverSoleil(){
	return $.post("/sunrise")
		.then(function(data) {
				console.log(data);
		});
}

function coucherSoleil(){
	return $.post("/sunset")
		.then(function(data) {
			console.log(data);
		});
}

function chimneyFire(){
	return $.post("/chimneyFire")
		.then(function(data) {
			console.log(data);
		});
}

function stop(){
	return $.post("/stop")
		.then(function(data) {
			console.log(data);
		});
}


function mettreReveil(heure , jours){
	return $.post("/reveil", {hour : heure, day : jours.join(',')} )
		.then(function(data) {
			console.log(data);
		});
}

function activeReveil(bool){
	return $.post("/activerreveil", {on : bool} )
		.then(function(data) {
			console.log(data)
		});
}

function getInfoReveil(){
	return $.get("/reveil");
}
