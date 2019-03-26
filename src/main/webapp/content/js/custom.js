$(document).ready(function(){
	$('#myNavbar ul.nav.navbar-nav li:first').css('background-color','#00B2A9');
	$('#myNavbar ul.nav.navbar-nav li:first a').css('color','#fff');
	$('#myNavbar ul.nav.navbar-nav li').on('click',function(){

		$('#myNavbar ul.nav.navbar-nav li').css('background-color','transparent');
		$(this).css('background-color','#00B2A9');
	});
});