$(document).ready(function(){
	$(window).scroll(function(event) {
		var s=$(this).scrollTop();
		var w=$(this).outerWidth();
		var h=$('.main').outerHeight();
		var h_b=$('.main_content1').outerHeight();
		var p = s/h*100;
		var p_b = s/h_b*100;
		var o = 1-1/100*p_b;

		var hr=w/2000*p_b;
		var z_1 = 1+(w*0.000005*p_b);

		$('.paralax_mount1').css('transform', 'translate3d('+hr+'px,0,0) scale('+z_1+')');
		$('.paralax_mount2').css('transform', 'translate3d('+hr+'px,0,0) scale('+z_1+')');
		$('.paralax_mount3').css('transform', 'translate3d('+hr+'px,0,0) scale('+z_1+')');
		$('.paralax_mount4').css('transform', 'translate3d('+hr+'px,0,0) scale('+z_1+')');
	})
});