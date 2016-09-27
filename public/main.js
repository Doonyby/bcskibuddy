$(document).ready(function() {
	$('#par').html('<p>Test to see if main.js is working.</p>');
	$('#myBtn').click(function() {
		$('.modal').css('display', 'block');
	});
	$('.close').click(function() {
		$('.modal').css('display', 'none');
	});
});