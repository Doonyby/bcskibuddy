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
	this.specs = {};
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
		that.specs = data;
		console.log(that.specs);
		if (!that.specs.email) {
	    	that.editUser();
	    }
	    else {
	    	that.buildHomePage();
	    }
    });
};
CurrentUser.prototype.editUser = function() {
	$('#userSetUpModal').modal('show');
	$('#userSetUpTitle').text('Hi ' + this.specs.name + '! Welcome to BCskibuddy!!!');
	this.specs.picture = {};
	var that = this;
	$('#userSetUpBtn').click(function() {
		var gearCheck = 'No';
		if ($('#setGearCheck').prop('checked')) {
			gearCheck = 'Yes';
		}
		that.specs.picture.data = './public/' + $('#setUserPic').attr('src');
		that.specs.picture.contentType = "image/jpg";
		that.specs.residence = $('#setLocation').val();
		that.specs.experienceLevel = $('#setExperienceLevel').val();
		that.specs.gear = gearCheck;
		that.specs.email = $('#setUserEmail').val();
		$('#userSetUpModal').modal('hide');
		that.updateUser();
	});
}
CurrentUser.prototype.editUserProfile = function() {
	var that = this;
	$('#profileModalBody').hide();
	$('#editFooter').hide();
	$('#modProfileForm').show();
	$('#saveFooter').show();
	$('#saveProfileBtn').click(function() {
		that.specs.name = $('#modName').val();
		that.specs.email = $('#modEmail').val();
		that.specs.picture.data = './public/' + $('#modUserPic').attr('src');
		that.specs.picture.contentType = "image/png";
		that.specs.residence = $('#modLocation').val();
		that.specs.experienceLevel = $('#modExperienceLevel').val();
		var gearCheck = 'No';
		if ($('#modGearCheck').prop('checked')) {
			gearCheck = 'Yes';
		}
		that.specs.gear = gearCheck;
		that.updateUser();
		$('#modProfileForm').hide();
		$('#saveFooter').hide();
		$('#profileModalBody').show();
		$('#editFooter').show();
	});
}
CurrentUser.prototype.updateUser = function() {
	var that = this;
	var ajax = $.ajax('/users/' + that.specs._id, {
		type: 'PUT',
		data: JSON.stringify(that.specs),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function() {
		console.log('completed a put');
		console.log(that.specs);
		that.buildHomePage();
	}).fail(function() {
		console.log('there is an error on put');
	});
}
CurrentUser.prototype.deleteAccount = function() {
	var ajax = $.ajax('/users/' + this.specs._id, {
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
	$('#navTitle').text(this.specs.name + "'s Home Page");
	$('#brandPic').attr('src', 'data:image/jpg;base64,' + this.specs.picture.data.toString('base64'));
	$('#profileName').text("Name: " + this.specs.name);
	$('#username').text("Username: " + this.specs.username);	
	$('#email').text("Email: " + this.specs.email);
	$('#profilePic').text("Picture: " + this.specs.picture.data);
	$('#profileLocation').text("Location: " + this.specs.residence);
	$('#profileExperience').text("Experience level: " + this.specs.experienceLevel);
	$('#profileGear').text("Beacon, Shovel, and Probe: " + this.specs.gear);
	$('#tourOrganizer').text(this.specs.username);
}
CurrentUser.prototype.createTour = function() {
	var newTour = {};
	newTour.createdBy = this.specs.username;
	newTour.location = $('#tourLocation').val();
	newTour.area = $('#tourArea').val();
	newTour.date = $('#tourDate').val();
	newTour.time = $('#tourTime').val();
	newTour.difficulty = $('#tourDifficulty').val();
	newTour.comments = $('#tourComments').val();
	newTour.usersGoing = [];
	newTour.usersGoing.push(this.specs.username);
	var that = this;
    var ajax = $.ajax('/tours', {
        type: 'POST',
        data: JSON.stringify(newTour),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
    	console.log('posted newTour');
    	that.getCreatedTours();
    }).fail(function(error) {
    	console.log(error);
    	console.log('failed to post newTour');
    });
}
// CurrentUser.prototype.editTour = function() {
	
// }
CurrentUser.prototype.getCreatedTours = function() {
	var that = this;
	var ajax = $.ajax('/tours/userCreated/' + that.specs.username, {
        type: 'GET',
		dataType: 'json',
		contentType: 'application/json'
    }).done(function(data) {
		$('#createTourModal').modal('hide');
		console.log(data);
    }).fail(function() {
    	console.log("couldn't get created tours");
    });	
}
// CurrentUser.prototype.joinTour = function() {
	
// }
// CurrentUser.prototype.getJoinedTours = function() {
	
// }
// CurrentUser.prototype.deleteTour = function() {
	
// }
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
		$('#modProfileForm').hide();
		$('#saveFooter').hide();
		$('#profileModalBody').show();
		$('#editFooter').show();
	});
	$('#editProfileBtn').click(function() {
		currentUser.editUserProfile();
	});
	$('#tourModalBtn').click(function() {
		$('#createTourModal').modal('show');
	});
	$('#createTourBtn').click(function() {
		currentUser.createTour();
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