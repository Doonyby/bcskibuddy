$(document).ready(function() {
	$('#oldAccountModal').modal('show');

	$('#closeOldAccountModal').click(function() {
		window.location.href = '/';
	});

	$('#oldAcctForm').submit(function(event) {
		event.preventDefault();
		var user = {
			username: $('#existingUsername').val(),
			password: $('#existingPassword').val()
		}
		currentUserControl(user);
	});
});

var CurrentUser = function() {
	this.data = {}
	this.tripsPlanned = [];
	this.tripsJoined = [];
}
CurrentUser.prototype.getUser = function(user) {
	var that = this;
	var ajax = $.ajax('/users/' + user.username, {
        type: 'GET',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json'
    }).done(function(data) {
	    $('#existingUsername').val('');
		$('#existingPassword').val('');
		$('#oldAccountModal').modal('hide');
		that.data = data;
		console.log(that.data);
		if (!that.data.email) {
	    	that.editUser(data);
	    }
	    else {
	    	that.buildHomePage();
	    }
    });
};
CurrentUser.prototype.editUser = function(user) {
	$('#userSetUpModal').modal('show');
	$('#userSetUpTitle').text('Hi ' + user.name + '! Welcome to BCskibuddy!!!');
	var editUser = user;
	editUser.picture = {};
	var that = this;
	$('#userSetUpBtn').click(function() {
		var haveGear = "No";
		if($('#setGearCheck').val() == true) {
			haveGear = "Yes";
		}
		editUser.picture.data = './public/' + $('#setUserPic').attr('src');
		editUser.picture.contentType = "image/png";
		editUser.residence = $('#setLocation').val();
		editUser.experienceLevel = $('#setExperienceLevel').val();
		editUser.gear = haveGear;
		editUser.email = $('#setUserEmail').val();
		$('#userSetUpModal').modal('hide');
		that.updateUser(editUser);
	});
}
CurrentUser.prototype.updateUser = function(user) {
	var that = this;
	var ajax = $.ajax('/users/' + user._id, {
		type: 'PUT',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function() {
		console.log('completed a put');
		console.log(that.data);
		that.buildHomePage();
	}).fail(function() {
		console.log('there is an error on put');
	});
}
CurrentUser.prototype.deleteAccount = function() {
	var ajax = $.ajax('/users/' + this.data._id, {
        type: 'DELETE',
        dataType: 'json'
    }).done(function() {
    	console.log('deleted account');
    	window.location.href = '/';
    }).fail(function() {
    	console.log('account not deleted');
    });
}
CurrentUser.prototype.buildHomePage = function() {
	$('#navTitle').text(this.data.name + "'s Home Page");
	$('#brandPic').attr('src', this.data.picture.data);
	$('#profileName').text("Name: " + this.data.name);
	$('#username').text("Username: " + this.data.username);	
	$('#email').text("Email: " + this.data.email);
	$('#profilePic').text("Picture: " + this.data.picture.data);
	$('#profileLocation').text("Location: " + this.data.residence);
	$('#profileExperience').text("Experience level: " + this.data.experienceLevel);
	$('#profileGear').text("Beacon, Shovel, and Probe: " + this.data.gear);
}
// CurrentUser.prototype.displayTrips = function() {
// 	mockUpcomingTrips.upcomingTrips.forEach(function(object) {
// 		var area = object.area;
// 		var date = object.date;
// 		var time = object.time;
// 		var difficulty = object.difficulty;
// 		var party = object.usersGoing.length;
// 		$('#tripInfo').html('<li><p>' + date + ": " + time + '</p><p>Area: ' + area + 
// 			'</p><p>Planned difficulty: ' + difficulty + 
// 			'</p><p>Group size: <a href="partySize">' + party + '</a></p></li>');
// 	});
// }

function currentUserControl(user) {
	var currentUser = new CurrentUser();
	currentUser.getUser(user);

    $('#deleteAcctBtn').click(function() {
		currentUser.deleteAccount();
	});
	$('#profileBtn').click(function() {
		$('#profileModal').modal('show');
	});
	$('#editProfileBtn').click(function() {
		$('#profileModalBody').hide();
		$('#editFooter').hide();
		$('#modProfileForm').show();
		$('#saveFooter').show();
	});
	$('#saveProfileBtn').click(function() {
		console.log('saving new profile');
	});
	$('#tripModalBtn').click(function() {
		$('#createTripModal').modal('show');
	});
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#userPic').attr('src', e.target.result).width(140).height(140);
        };

        reader.readAsDataURL(input.files[0]);
    }
}