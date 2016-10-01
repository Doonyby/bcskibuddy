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
	else if(checkUsernameRepeat(username) == false) {
		$('#formScrewUp').text('Username already exists. If you already have an account, ' + 
			'close this window, and login as an existing user. Otherwise, ' +
			 'please choose a new username.').css('color', 'red');
	}
	else {
		siteUsers.addUser(name, username, password);
		$('#name').val('');
		$('#username').val('');
		$('#password').val('');
		$('#password2').val('');
		$('#formScrewUP').text('');
		$('.modal').modal('hide');
	}
	function checkUsernameRepeat(name) {
		for (var i=0; i<siteUsers.users.length; i++) {
			if(name === siteUsers.users[i].username) {
				return false;
			}
			else {
				return true;
			} 
		}
	}
}

var Users = function() {
	this.users = [];
}

Users.prototype.getUser = function() {
	var ajax = $.ajax('/users', {
        type: 'GET',
        dataType: 'json'
    });
};

Users.prototype.addUser = function(name, username, password) {
    var user = {'name':name, 'username': username, 'password': password};
    var ajax = $.ajax('/users', {
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json'
    });
    siteUsers.users.push(user);
    console.log(this);
    ajax.done(this.getUser.bind(this));
};

var siteUsers = new Users();

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