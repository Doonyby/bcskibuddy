$(document).ready(function() {
	$('#oldAccountModal').modal('show');

	$('#closeOldAccountModal').click(function() {
		window.location.href = '/';
	});

	$('#oldAcctForm').submit(function(event) {
		event.preventDefault();
		getUser();
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

var getUser = function() {
	var user = {
		username: $('#existingUsername').val(),
		password: $('#existingPassword').val()
	}
	var ajax = $.ajax('/users/' + user.username, {
        type: 'GET',
		data: user,
		dataType: 'json',
		contentType: 'application/json'
    }).done(function(data) {
    	console.log(data);
    	if (!data.email) {
    		console.log('no email!!!');
    	}
    	else {
    		console.log('has email!');
    	}
    });
};

// function newUserQuestions(obj) {
// 	$('#name').val('');
// 	$('#username').val('');
// 	$('#password').val('');
// 	$('#password2').val('');
// 	$('#formScrewUp').text('');
// 	$('.modal').modal('hide');
// 	var newUserObj = obj;
// 	newUserObj.picture = {};
// 	$('#userSetUpModal').modal('show');
// 	$('#userSetUpTitle').text('Hi ' + obj.name + '! Welcome to BCskibuddy!!!');
// 	$('#userSetUpBtn').click(function() {
// 		var haveGear = "No";
// 		if($('#gearCheck').val() == "yes") {
// 			haveGear = "Yes"
// 		}
// 		newUserObj.picture.data = $('#userPic').attr('src');
// 		newUserObj.picture.contentType = "image/png";
// 		newUserObj.residence = $('#selectLocation').val();
// 		newUserObj.experienceLevel = $('#experienceLevel').val();
// 		newUserObj.gear = haveGear;
// 		newUserObj.email = $('#newUserEmail').val();
// 		$('#userSetUpModal').modal('hide');
// 		console.log(newUserObj);
// 		editUser(newUserObj);
// 	});
// }

// function editUser(newUserObj) {
// 	var user = newUserObj;
// 	var ajax = $.ajax('/users/' + user._id, {
// 		type: 'PUT',
// 		data: JSON.stringify(user),
// 		dataType: 'json',
// 		contentType: 'application/json'
// 	}).done(getNewUser.bind(this)).fail(function() {
// 		console.log('there is an error on put');
// 	});
// }

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#userPic').attr('src', e.target.result).width(140).height(140);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

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