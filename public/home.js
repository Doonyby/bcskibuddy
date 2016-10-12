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
		getUser(user);
	});
});

var CurrentUser = function(data) {
	console.log(data);
	this.name = data.name;
	this.id = data._id;
	this.username = data.username;
	this.email = '';
	this.residence = '';
	this.experienceLevel = '';
	this.gear = '';
	this.picture = '';
	this.tripsPlanned = [];
	this.tripsJoined = [];
}
CurrentUser.prototype.buildHomePage = function() {
	$('#navTitle').text(this.name + "'s Home Page");
	$('#brandPic').attr('src', this.picture);
}
CurrentUser.prototype.deleteAccount = function() {
	var ajax = $.ajax('/users/' + this.id, {
        type: 'DELETE',
        dataType: 'json'
    }).done(function() {
    	console.log('deleted account');
    	window.location.href = '/';
    }).fail(function() {
    	console.log('account not deleted');
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
		that.buildHomePage();
	}).fail(function() {
		console.log('there is an error on put');
	});
}
CurrentUser.prototype.editUser = function(user) {
	$('#userSetUpModal').modal('show');
	$('#userSetUpTitle').text('Hi ' + user.name + '! Welcome to BCskibuddy!!!');
	var editUser = user;
	editUser.picture = {};
	var that = this;
	$('#userSetUpBtn').click(function() {
		var haveGear = "No";
		if($('#gearCheck').val() == "yes") {
			haveGear = "Yes"
		}
		editUser.picture.data = './public/' + $('#userPic').attr('src');
		editUser.picture.contentType = "image/png";
		editUser.residence = $('#selectLocation').val();
		editUser.experienceLevel = $('#experienceLevel').val();
		editUser.gear = haveGear;
		editUser.email = $('#newUserEmail').val();
		$('#userSetUpModal').modal('hide');
		that.updateUser(editUser);
	});
}

CurrentUser.prototype.editAccount = function() {

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

function currentUserControl(data) {
	var currentUser = new CurrentUser(data);
	console.log(currentUser);
    if (!currentUser.email) {
    	currentUser.editUser(data);
    }
    else {
    	currentUser.buildHomePage();
    }
    
    $('#deleteAcctBtn').click(function() {
		currentUser.deleteAccount();
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
}

var getUser = function(user) {
	var ajax = $.ajax('/users/' + user.username, {
        type: 'GET',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json'
    }).done(function(data) {
	    $('#existingUsername').val('');
		$('#existingPassword').val('');
		$('#oldAccountModal').modal('hide');
		currentUserControl(data);
   //  	if (!data.email) {
   //  		console.log('no email!!!');
   //  		$('#existingUsername').val('');
			// $('#existingPassword').val('');
   //  		$('#oldAccountModal').modal('hide');
   //  		newUserQuestions(data);
   //  	}
   //  	else {
   //  		console.log('has email!');
   //  		$('#existingUsername').val('');
			// $('#existingPassword').val('');
   //  		$('#oldAccountModal').modal('hide');
   //  		currentUserControl(data);
   //  	}
    });
};

// function newUserQuestions(obj) {
// 	$('#userSetUpModal').modal('show');
// 	$('#userSetUpTitle').text('Hi ' + obj.name + '! Welcome to BCskibuddy!!!');
// 	var newUserObj = obj;
// 	newUserObj.picture = {};
// 	$('#userSetUpBtn').click(function() {
// 		var haveGear = "No";
// 		if($('#gearCheck').val() == "yes") {
// 			haveGear = "Yes"
// 		}
// 		newUserObj.picture.data = './public/' + $('#userPic').attr('src');
// 		newUserObj.picture.contentType = "image/png";
// 		newUserObj.residence = $('#selectLocation').val();
// 		newUserObj.experienceLevel = $('#experienceLevel').val();
// 		newUserObj.gear = haveGear;
// 		newUserObj.email = $('#newUserEmail').val();
// 		$('#userSetUpModal').modal('hide');
// 		editUser(newUserObj);
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

// function editUser(newUserObj) {
// 	var user = newUserObj;
// 	var ajax = $.ajax('/users/' + user._id, {
// 		type: 'PUT',
// 		data: JSON.stringify(user),
// 		dataType: 'json',
// 		contentType: 'application/json'
// 	}).done(getUser.bind(this), function() {
// 		console.log('completed a put');
// 	}).fail(function() {
// 		console.log('there is an error on put');
// 	});
// }


