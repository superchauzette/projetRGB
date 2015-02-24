$(function() {

	var widthTotal = $('body')[0].clientWidth;
	var x = -5;
	xsl2rgb(x,100,50);	

	$( "#draggable" ).draggable({
		scroll: false, 
		//axis: "x" ,
		stop: function(d) {
			x =  Math.round( (d.clientX/widthTotal)*100 - 5 );
			xsl2rgb(x,100,50);	
		}	 
	});

	$('#lumisosite').on("change", function(d){			
		xsl2rgb( x, 100, $(this)[0].value );
	});
	$("#btnoff").on("click", function(){
		$('#lumisosite')[0].value = 0;
		xsl2rgb(0,0,0);
	})

	$("#btnon").on("click", function(){
		$('#lumisosite')[0].value = 100;
		xsl2rgb(0,0,100);
	})

});

function pwm(red, green, blue){
    $.get( "/pwm",{red : red, green : green, blue: blue} ,function( data ) {
       console.log(data)  
       $('#reponse').html(data) 
    });
}

function xsl2rgb(x,s,l){
	var hsl = [ x*360/100 , s, l ];
	var rgb = hsl2rgb(hsl);

	$('#info')
		.html( x+5 +"% </br> lumisosite : "+l + "%")
		.css("background", "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");

	pwm(rgb[0], rgb[1], rgb[2]);
}

function hsl2rgb(hsl) {
  var h = hsl[0] ,
      s = hsl[1] ,
      l = hsl[2];

  var r, g, b, m, c, x

  if (!isFinite(h)) h = 0
  if (!isFinite(s)) s = 0
  if (!isFinite(l)) l = 0

  h /= 60
  if (h < 0) h = 6 - (-h % 6)
  h %= 6

  s = Math.max(0, Math.min(1, s / 100))
  l = Math.max(0, Math.min(1, l / 100))

  c = (1 - Math.abs((2 * l) - 1)) * s
  x = c * (1 - Math.abs((h % 2) - 1))

  if (h < 1) {
    r = c
    g = x
    b = 0
  } else if (h < 2) {
    r = x
    g = c
    b = 0
  } else if (h < 3) {
    r = 0
    g = c
    b = x
  } else if (h < 4) {
    r = 0
    g = x
    b = c
  } else if (h < 5) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  m = l - c / 2
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return [ r,g,b ]
}

