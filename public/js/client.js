(function ($) {

  $('#led').click(function(e) {
     e.preventDefault(); 
     $('#add').empty();    
     pwm($('#red').val(),$('#green').val(), $('#blue').val());
     return false;
  });

  var f = $.farbtastic('#picker');

  f.linkTo(function(color){
    $('.color').css('background', color);
    color = color.substring(1,color.length);
    rgb = hexToRgb(color).split(",");
    hsv = f.RGBToHSL(rgb);
    
    $('#red').val(rgb[0]) ;
    $('#green').val(rgb[1]) ;
    $('#blue').val(rgb[2]) ;

    $('#h').val(hsv[0]) ;
    $('#s').val(hsv[1]) ;
    $('#v').val(hsv[2]) ;
  });

  $('.hsvForm').change(function(){
    var hsv =[];
    hsv[0] = $('#h').val() ;
    hsv[1] = $('#s').val() ;
    hsv[2] = $('#v').val() ;

    var rgb = f.HSLToRGB(hsv);

    $('.color').css('background-color', 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')' );
  });

  $('.rgbForm').change(function(){
      var rgb =[];
      rgb[0] = $('#red').val() ;
      rgb[1] = $('#green').val() ;
      rgb[2] = $('#blue').val() ;

      $('.color').css('background-color', 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')' );

      var hsv = f.RGBToHSV(rgb);
      $('#h').val(hsv[0]) ;
      $('#s').val(hsv[1]) ;
      $('#v').val(hsv[2]) ;
  });

})(jQuery);



function pwm(red, green, blue){
    $.get( "/pwm",{red : red, green : green, blue: blue} ,function( data ) {
       $('#add').append("<br />"+data);
    });
}

function hexToRgb(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;

      return r + "," + g + "," + b;
}
  
