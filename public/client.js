$(document).ready(function() {

	$('#newAccountBtn').click(function() {
		$('#newAccountModal').modal('show');
	});

	$('#oldAccountBtn').click(function() {
		window.location.href = '/user';
	});

	$('#closeNewAccountModal').click(function() {
		$('#name').val('');
		$('#username').val('');
		$('#password').val('');
		$('#password2').val('');
		$('#formScrewUp').text('');
		$('.modal').modal('hide');
	});

	$('#newAcctForm').submit(function(e) {
		e.preventDefault();
		submitNewAcctForm();
	});

});

function submitNewAcctForm() {
	var name = $('#name').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var password2 = $('#password2').val();
	if(name === '') {
		$('#formScrewUp').text('Please enter a name.').css('color', 'red');
	}
	else if(username === '') {
		$('#formScrewUp').text('Please enter a username.').css('color', 'red');
	}
	else if(password === '') {
		$('#formScrewUp').text('Please enter a password.').css('color', 'red');
	}
	else if(password2 === '') {
		$('#formScrewUp').text('Please confirm password.').css('color', 'red');
	}
	else if(password !== password2) {
		$('#formScrewUp').text('Passwords do not match.').css('color', 'red');
	}
	else {
		addNewUser(name, username, password);
	}
}

var addNewUser = function(name, username, password) {
    var user = {'name': name, 'username': username, 'password': password};
    var ajax = $.ajax('/users', {
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function() {
    	console.log('posted name and should be in a new window');
    	window.location.href= '/user';	
    }).fail(function(error) {
    	console.log(error);
    	if (error.responseJSON.message = "Username already exists") {
			$('#formScrewUp').text('Username already exists. If you already have an account, ' + 
				'close this window, and login as an existing user. Otherwise, ' +
				 'please choose a new username.').css('color', 'red');
    	}
    	else {
    		$('#formScrewUp').text('Request error on server. Please try again.').css('color','red');
    	}
    });
};

