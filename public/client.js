$(document).ready(function() {
	$('#par').html('<p>client.js is working.</p>');
	$('#newAccountBtn').click(function() {
		$('#newAccountModal').modal('show');
	});
	$('#closeNewAccountModal').click(function() {
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
	$('#profileBtn').click(function() {
		$('#profileModal').modal('show');
	});
	$('#tripModalBtn').click(function() {
		$('#createTripModal').modal('show');
	});
	$('#editProfileBtn').click(function() {
		$('#profileModalBody').hide();
		$('#editFooter').hide();
		$('#modProfileForm').show();
		$('#saveFooter').show();
	});
	$('#saveProfileBtn').click(function() {
		$('#modProfileForm').hide();
		$('#saveFooter').hide();
		$('#profileModalBody').show();
		$('#editFooter').show();
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

// var getNewUser = function(userObj) {
// 	var ajax = $.ajax('/users/' + userObj.username, {
//         type: 'GET',
//         dataType: 'json'
//     }).done(function(data) {
//     	sessionStorage.setItem('userObject', JSON.stringify(data));
//     	homePageSetUp();
//     });
// };

// function homePageSetUp() {
// 	location.href = "/user";
// 	var userObj = JSON.parse(sessionStorage.getItem('userObject'));
// 	console.log(userObj);
// }

function newUserQuestions(obj) {
	console.log('before /user');
	location.href = '/user';
	console.log('after /user');
	var newUserObj = obj;
	$('#userSetUpModal').modal('show');
	console.log('after set up modal called');
	$('#userSetUpButton').click(function() {
		var haveGear = "No";
		if($('#gearCheck').val() == "yes") {
			haveGear = "Yes"
		}
		newUserObj.residence = $('#selectLocation').val();
		newUserObj.experienceLevel = $('#experienceLevel').val();
		newUserObj.gear = haveGear;
		newUserObj.email = $('#newUserEmail').val();
		$('#userSetUpModal').modal('hide');
		console.log(newUserObj);
	});
}

var addNewUser = function(name, username, password) {
    var user = {'name':name, 'username': username, 'password': password};
    var ajax = $.ajax('/users', {
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json'
    }).done(newUserQuestions.bind(this), function() {
    	$('#name').val('');
		$('#username').val('');
		$('#password').val('');
		$('#password2').val('');
		$('#formScrewUp').text('');
		$('.modal').modal('hide');	
    }).fail(function(error) {
    	console.log(error.responseJSON.message);
    	if (error.responseJSON.message = "Username already exists") {
			$('#formScrewUp').text('Username already exists. If you already have an account, ' + 
				'close this window, and login as an existing user. Otherwise, ' +
				 'please choose a new username.').css('color', 'red');
    	}
    	else {
    		$('#formScrewUp').text('Request error on server. Please try again.'),css('color','red');
    	}
    });
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