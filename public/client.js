$(document).ready(function() {
	$('#par').html('<p>client.js is working.</p>');
	$('#myBtn').click(function() {
		$('.modal').modal('show');
	});
	$('.close').click(function() {
		$('#name').val('');
		$('#username').val('');
		$('#password').val('');
		$('#password2').val('');
		$('#formScrewUP').text('');
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
		$('#name').val('');
		$('#username').val('');
		$('#password').val('');
		$('#password2').val('');
		$('#formScrewUp').text('');
		$('.modal').modal('hide');
	}
}

var getNewUser = function(userObj) {
	var ajax = $.ajax('/users/' + userObj.username, {
        type: 'GET',
        dataType: 'json'
    }).done(function(data) {
    	console.log(data);
    });
};

var addNewUser = function(name, username, password) {
    var user = {'name':name, 'username': username, 'password': password};
    var ajax = $.ajax('/users', {
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(getNewUser.bind(this));
};

// else if(checkUsernameRepeat(username) == false) {
// 	$('#formScrewUp').text('Username already exists. If you already have an account, ' + 
// 		'close this window, and login as an existing user. Otherwise, ' +
// 		 'please choose a new username.').css('color', 'red');
// }

// mockUpcomingTrips.upcomingTrips.forEach(function(object) {
// 	var area = object.area;
// 	var date = object.date;
// 	var time = object.time;
// 	var difficulty = object.difficulty;
// 	var party = object.usersGoing.length;
// 	$('#tripInfo').html('<li><p>' + date + ": " + time + '</p><p>Area: ' + area + 
// 		'</p><p>Planned difficulty: ' + difficulty + 
// 		'</p><p>Group size: <a href="partySize">' + party + '</a></p></li>');
// });