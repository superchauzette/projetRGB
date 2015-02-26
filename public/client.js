$(function() {

	var widthTotal = $('body')[0].clientWidth;
	var x = 0;
	xsv2rgb(x,100,50);	

	$( "#draggable" ).draggable({
		scroll: false, 
		//axis: "x" ,
		stop: function(d) {
			x =  Math.round( (d.clientX/widthTotal)*100 );
			xsv2rgb(x,100,50);	
		}	 
	});

	$('#lumisosite').on("change", function(d){			
		xsv2rgb( x, 100, $(this)[0].value );
	});
	$("#btnoff").on("click", function(){
		$('#lumisosite')[0].value = 0;
		xsv2rgb(0,0,0);
	})

	$("#btnon").on("click", function(){
		$('#lumisosite')[0].value = 100;
		xsv2rgb(0,0,100);
	})

});

function pwm(red, green, blue){
    $.get( "/pwm",{red : red, green : green, blue: blue} ,function( data ) {
       console.log(data)  
       $('#reponse').html(data) 
    });
}

function xsv2rgb(x,s,v){
	var rgb = hsv2rgb( [x*360/100 , s, v] );
	var r = Math.round(rgb[0]);
	var g = Math.round(rgb[1]);
	var b = Math.round(rgb[2]);

	$('#info').html( x +"% </br> lumisosite : "+ v + "%")
			  .css("background-color", "rgb("+ r +","+ g +","+ b +")" );

	//pwm(rgb[0], rgb[1], rgb[2]);
}

function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}