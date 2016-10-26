$(document).ready(function() {
    currentUser.clearCurrentUser();
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
        currentUser.getUser(user);
        
    });
    
    $('#deleteAcctBtn').click(function() {
        if (confirm("Are you sure you want to delete this Account? Any tours you have sheduled will be lost.") == true) {
            currentUser.deleteAccount();
        } 
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
    $('#tourByLocationForm').submit(function(e) {
        e.preventDefault();
        currentUser.getTourByLocationList();
    });
});

var CurrentUser = function() {
    this.specs = {};
    this.toursPlanned = [];
    this.toursJoined = [];
}
CurrentUser.prototype.getUser = function(user) {
    var that = this;
    var ajax = $.ajax('/login', {
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        $('#existingUsername').val('');
        $('#existingPassword').val('');
        $('#oldAccountModal').modal('hide');
        that.specs = data;
        if (!that.specs.email) {
            that.editUser();
        }
        else {
            that.buildHomePage();
        }
    }).fail(function(error) {
        console.log(error);
        if (error) {
            $('#signInFormScrewUp').text("Username and/or Password are incorrect. If you don't have an account with us," + 
                " please close the window and create an account.  Otherwise, try again.").css('color', 'red');
        }
    });
};
CurrentUser.prototype.editUser = function() {
    $('#userSetUpModal').modal('show');
    $('#userSetUpTitle').text('Hi ' + this.specs.name + '! Welcome to BCskibuddy!!!');
    var that = this;
    $('#userSetUpBtn').click(function() {
        var gearCheck = 'No';
        if ($('#setGearCheck').prop('checked')) {
            gearCheck = 'Yes';
        }
        that.specs.residence = $('#setLocation').val();
        that.specs.experienceLevel = $('#setExperienceLevel').val();
        that.specs.gear = gearCheck;
        that.specs.email = $('#setUserEmail').val();
        $('#userSetUpModal').modal('hide');
        that.updateUser();
    });
}
CurrentUser.prototype.editUserProfile = function() {
    $('#modName').val(this.specs.name);
    $('#modEmail').val(this.specs.email);
    $('#modLocation').val(this.specs.residence);
    $('#modExperienceLevel').val(this.specs.experienceLevel);
    if (this.specs.gear == 'Yes') {
        $('#modGearCheck').prop('checked', true);
    } 
    else if (this.specs.gear == 'No') {
        $('#modGearCheck').prop('checked', false);
    }
    var that = this;
    $('#profileModalBody').hide();
    $('#editFooter').hide();
    $('#modProfileForm').show();
    $('#saveFooter').show();
    $('#saveProfileBtn').click(function() {
        that.specs.name = $('#modName').val();
        that.specs.email = $('#modEmail').val();
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
    console.log(this.specs);
    $('#navTitle').text(this.specs.name.toUpperCase() + "'s Home Page");
    $('#profileName').text("Name: " + this.specs.name);
    $('#username').text("Username: " + this.specs.username);    
    $('#email').text("Email: " + this.specs.email);
    $('#profileLocation').text("Location: " + this.specs.residence);
    $('#profileExperience').text("Experience level: " + this.specs.experienceLevel);
    $('#profileGear').text("Beacon, Shovel, and Probe: " + this.specs.gear);
    $('#tourOrganizer').text(this.specs.username);
    this.getCreatedTours();
    this.getJoinedTours();
}
CurrentUser.prototype.createTour = function() {
    var newTour = {};
    newTour.createdBy = this.specs.username;
    newTour.location = $('#tourLocation').val();
    newTour.area = $('#tourArea').val();
    newTour.date = $('#tourDate').val();
    newTour.time = $('#tourTime').val();
    newTour.difficulty = $('#tourDifficulty').val();
    newTour.usersGoing = [];
    newTour.usersGoing.push(this.specs.username);   
    newTour.comments = [];
    newTour.comments.push({
                            'username': this.specs.username,
                            'comment': $('#tourComments').val()
                          });
    var that = this;
    var ajax = $.ajax('/tours', {
        type: 'POST',
        data: JSON.stringify(newTour),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        console.log('posted newTour');
        that.getCreatedTours();
        $('#joinTourByLocationPanel').empty();
        $('#tourLocation').val('');
        $('#tourArea').val('');
        $('#tourDate').val('');
        $('#tourTime').val('');
        $('#tourDifficulty').val('');
        $('#tourComments').val('')
    }).fail(function(error) {
        console.log(error);
        console.log('failed to post newTour');
    });
}
CurrentUser.prototype.getCreatedTours = function() {
    var that = this;
    var ajax = $.ajax('/tours/userCreated/' + that.specs.username, {
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        $('#createTourModal').modal('hide');
        that.toursPlanned = data;
        that.displayCreatedTours();
    }).fail(function() {
        console.log("couldn't get created tours");
    }); 
}
CurrentUser.prototype.displayCreatedTours = function() {
    $(userTourPanel).empty();
    if (this.toursPlanned.length == 0) {
        $('#userTourPanel').append('<p>You do not have any upcoming tours that you organized. ' + 
            'Click "Create Tour" button above to create a new ski trip.</p>');
    }
    else {
        $('#userTourPanel').append('<p>These are the tours that you have organized.</p>');      
        this.toursPlanned.forEach(function(item, index) {
            var id = item._id;
            var organizer = item.createdBy;
            var location = item.location;
            function avyLink() {
                if (location == "Salt Lake City") {
                    return "salt-lake";
                }
                else if (location == "Abajos") {
                    return "abajo";
                }
                else {
                    return location;
                }
            }
            var area = item.area;
            var d = new Date(item.date);
            var date = d.toDateString();
            var time = item.time;
            var difficulty = item.difficulty;
            var party = '';
            var getParty = item.usersGoing.forEach(function(item) {
                party += '<a href="#"><u>' + item + '</u> </a>';
            });
            var comments = '';
            var getComments = item.comments.forEach(function(item) {
                comments += '<div class="media">' +
                              '<div class="media-body">' +
                                '<h5 class="media-heading"><a href="#"><u>' + item.username + '</u></a></h5>' +
                                '<p>' + item.comment + '</p>' +
                              '</div>' +
                            '</div>' 
            });
            var html = '';
            html += '<div class="panel panel-primary">' +
                        '<div class="panel-heading collapsed" role="tab button" id="planTourHeading' + index + '" data-toggle="collapse" href="#planTourCollapse' + index + '" aria-expanded="false" aria-controls="planTourCollapse' + index + '">' +
                          '<h4 class="panel-title">' +
                             location + ': ' + area + ',   ' + date + ': ' + time + '<span class="caret" style="float:right;"></span>' +
                          '</h4>' +
                        '</div>' +
                        '<div id="planTourCollapse' + index + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="planTourHeading' + index + '">' +
                          '<div class="panel-body">' +
                            '<h4>Tour Organizer: <a href="#"><u>' + organizer + '</u></a></h4>' +
                            '<h4>Difficulty: ' + difficulty + '</h4>' +
                            '<h4>Members Going: ' + party + '</h4>' +
                            '<p>View the Utah Avalanche Center advisory for this area <a target="_blank" href="https://utahavalanchecenter.org/advisory/' + avyLink() + '"><u>here.</u></a>' +
                            '<h4>Comments:</h4>' +
                            '<div id="commentsDiv">' + comments + '</div>' +
                            '<div id="addCommentsDiv">' +
                              '<br><br><textarea class="form-control" rows="4" onkeydown="enterPushed(event, this.value, this.id)" id="' + id + '" placeholder="Enter new comment here."></textarea><br>' +
                              '<p>Press "Enter" to post comment.' +
                            '</div>' +                          
                          '</div>' +
                          '<div class="panel-footer">' +
                              '<button type="button" style="float: right;" class="btn btn-link" onclick="cancelTourBtn(this.value)" value="' + id + '"><span class="text-danger">Cancel Tour</span></button>' +
                              '<button type="button" class="btn btn-link" data-toggle="collapse" href="#planTourCollapse' + index + '">Collapse</button>' +
                          '</div>' +
                        '</div>' +
                    '</div>';
            $('#userTourPanel').append(html);
        });
    }
}
CurrentUser.prototype.deleteTour = function(tourId) {
    var that = this;
    var ajax = $.ajax('/tour/deleteTour/' + tourId, {
        type: 'DELETE',
        dataType: 'json'
    }).done(function() {
        console.log('deleted tour');
        that.getCreatedTours();
        $('#joinTourByLocationPanel').empty();
    }).fail(function() {
        console.log('tour not deleted');
    });
}
CurrentUser.prototype.joinTour = function(tripId) {
    var that = this;
    var ajax = $.ajax('/tours/joinTour/' + tripId, {
        type: 'PUT',
        data: JSON.stringify({'username': that.specs.username}),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        console.log('completed join tour put');
        that.getJoinedTours();
    }).fail(function() {
        console.log('could not complete join tour put');
    });
}
CurrentUser.prototype.getJoinedTours = function() {
    var that = this;
    var ajax = $.ajax('/tours/userJoined/' + that.specs.username, {
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        that.toursJoined = [];
        for (var i=0; i<data.length; i++) {
            if (data[i].createdBy !== that.specs.username) {
                that.toursJoined.push(data[i]);
            }
        }
        that.displayJoinedTours();
    }).fail(function() {
        console.log("couldn't get created tours");
    });
}
CurrentUser.prototype.displayJoinedTours = function() {
    $(joinedTourPanel).empty();
    if (this.toursJoined.length == 0) {
        $('#joinedTourPanel').append('<p>You have not joined any tours yet. Search through the locations' +
            ' below to find a tour to join in your desired area.</p>');
    }
    else {
        $('#joinedTourPanel').append('<p>These are the tours that you have joined.</p>');       
        this.toursJoined.forEach(function(item, index) {
            var id = item._id;
            var organizer = item.createdBy;
            var location = item.location;
            function avyLink() {
                if (location == "Salt Lake City") {
                    return "salt-lake";
                }
                else if (location == "Abajos") {
                    return "abajo";
                }
                else {
                    return location;
                }
            }
            var area = item.area;
            var d = new Date(item.date);
            var date = d.toDateString();
            var time = item.time;
            var difficulty = item.difficulty;
            var party = '';
            var getParty = item.usersGoing.forEach(function(item) {
                party += '<a href="#"><u>' + item + '</u> </a>';
            });
            var comments = '';
            var getComments = item.comments.forEach(function(item) {
                comments += '<div class="media">' +
                              '<div class="media-body">' +
                                '<h5 class="media-heading"><a href="#"><u>' + item.username + '</u></a></h5>' +
                                '<p>' + item.comment + '</p>' +
                              '</div>' +
                            '</div>' 
            });
            var html = '';
            html += '<div class="panel panel-primary">' +
                        '<div class="panel-heading collapsed" role="tab button" id="joinTourHeading' + index + '" data-toggle="collapse" href="#joinTourCollapse' + index + '" aria-expanded="false" aria-controls="joinTourCollapse' + index + '">' +
                          '<h4 class="panel-title">' +
                             location + ': ' + area + ',   ' + date + ': ' + time + '<span class="caret" style="float:right;"></span>' +
                          '</h4>' +
                        '</div>' +
                        '<div id="joinTourCollapse' + index + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="joinTourHeading' + index + '">' +
                          '<div class="panel-body">' +
                            '<h4>Tour Organizer: <a href="#"><u>' + organizer + '</u></a></h4>' +
                            '<h4>Difficulty: ' + difficulty + '</h4>' +
                            '<h4>Members Going: ' + party + '</h4>' +
                            '<p>View the Utah Avalanche Center advisory for this area <a target="_blank" href="https://utahavalanchecenter.org/advisory/' + avyLink() + '"><u>here.</u></a>' +
                            '<h4>Comments:</h4>' +
                            '<div id="commentsDiv">' + comments + '</div>' +
                            '<div id="addCommentsDiv">' +
                              '<br><br><textarea class="form-control" rows="4" onkeydown="enterPushed(event, this.value, this.id)" id="' + id + '" placeholder="Enter new comment here."></textarea><br>' +
                              '<p>Press "Enter" to post comment.' +
                            '</div>' +
                          '</div>' +
                          '<div class="panel-footer">' +
                              '<button type="button" style="float: right;" class="btn btn-link" onclick="leaveTourBtn(this.value)" value="' + id + '"><span class="text-danger">Leave Tour</span></button>' +
                              '<button type="button" class="btn btn-link" data-toggle="collapse" href="#joinTourCollapse' + index + '">Collapse</button>' +                           
                          '</div>' +
                        '</div>' +
                    '</div>';
            $('#joinedTourPanel').append(html);
        });
    }
}
CurrentUser.prototype.leaveTour = function(tripId) {
    var that = this;
    var ajax = $.ajax('/tours/leaveTour/' + tripId, {
        type: 'PUT',
        data: JSON.stringify({'username': that.specs.username}),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        console.log('completed leave tour put');
        that.getJoinedTours();
    }).fail(function(error) {
        console.log(error);
        console.log('could not complete leave tour put');
    });
}
CurrentUser.prototype.getTourByLocationList = function() {
    var that = this;
    var searchLocation = $('#browseTourByLocation').val();
    var ajax = $.ajax('/tours/searchLocation/' + searchLocation, {
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        if (data.length === 0) {
            $('#joinTourByLocationPanel').html('<p>There are no current tours scheduled in the' +
                ' selected location. Please select another location, or organize a tour for this' +
                ' location by creating a tour above.</p>');
        }
        else {
            that.displayTourByLocation(data);
        }
    }).fail(function() {
        console.log("couldn't get tours by location");
    }); 
}
CurrentUser.prototype.displayTourByLocation = function(tours) {
    $('#joinTourByLocationPanel').empty();
    tours.forEach(function(item, index) {
        var organizer = item.createdBy;
        var id = item._id;
        var location = item.location;
        function avyLink() {
            if (location == "Salt Lake City") {
                return "salt-lake";
            }
            else if (location == "Abajos") {
                return "abajo";
            }
            else {
                return location;
            }
        }
        var area = item.area;
        var d = new Date(item.date);
        var date = d.toDateString();
        var time = item.time;
        var difficulty = item.difficulty;
        var party = '';
        var getParty = item.usersGoing.forEach(function(item) {
            party += '<a href="#"><u>' + item + '</u> </a>';
        });
        var comments = '';
        var getComments = item.comments.forEach(function(item) {
            comments += '<div class="media">' +
                          '<div class="media-body">' +
                            '<h5 class="media-heading"><a href="#"><u>' + item.username + '</u></a></h5>' +
                            '<p>' + item.comment + '</p>' +
                          '</div>' +
                        '</div>' 
        });
        var html = '';
        html += '<div class="panel panel-primary">' +
                    '<div class="panel-heading collapsed" role="tab button" id="locationTourHeading' + index + '" data-toggle="collapse" href="#locationTourCollapse' + index + '" aria-expanded="false" aria-controls="locationTourCollapse' + index + '">' +
                      '<h4 class="panel-title">' +
                         location + ': ' + area + ',   ' + date + ': ' + time + '<span class="caret" style="float:right;"></span>' +
                      '</h4>' +
                    '</div>' +
                    '<div id="locationTourCollapse' + index + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="locationTourHeading' + index + '">' +
                      '<div class="panel-body">' +
                        '<h4>Tour Organizer: <a href="#"><u>' + organizer + '</u></a></h4>' +
                        '<h4>Difficulty: ' + difficulty + '</h4>' +
                        '<h4>Members Going: ' + party + '</h4>' +
                        '<p>View the Utah Avalanche Center advisory for this area <a target="_blank" href="https://utahavalanchecenter.org/advisory/' + avyLink() + '"><u>here.</u></a>' +
                        '<h4>Comments:</h4>' +
                        '<div id="commentsDiv">' + comments + '</div>' +
                      '</div>' +
                      '<div class="panel-footer">' +
                          '<button type="button" class="btn btn-link" data-toggle="collapse" href="#locationTourCollapse' + index + '">Collapse</button>' +                           
                          '<button type="button" style="float: right;" class="btn btn-primary" onclick="joinTourBtn(this.value)" value="' + id + '">Join Tour</button>' +
                      '</div>' +
                    '</div>' +
                '</div>';
        $('#joinTourByLocationPanel').append(html);
    });
}
CurrentUser.prototype.addComment = function(comment, tripId) {
    var newComment = {};
    newComment.username = this.specs.username;
    newComment.comment = comment;
    var that = this;
    var ajax = $.ajax('/tours/addComment/' + tripId, {
        type: 'PUT',
        data: JSON.stringify(newComment),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(data) {
        console.log(data);
        console.log('completed comment put');
        that.getJoinedTours();
        that.getCreatedTours();
    }).fail(function(error) {
        console.log(error);
        console.log('could not complete comment put');
    })
}

CurrentUser.prototype.clearCurrentUser = function() {
    console.log('clear user has been called');
    this.specs = {};
    this.toursPlanned = [];
    this.toursJoined = [];
}

var currentUser = new CurrentUser();

function joinTourBtn(id) {
    currentUser.joinTour(id);
}



function leaveTourBtn(id) {
    if (confirm("Are you sure you want to leave this tour?") == true) {
        currentUser.leaveTour(id);
    } 
}

function enterPushed(event, comment, id) {
    if(event.which == 13) {
        currentUser.addComment(comment, id);
    }
}

function cancelTourBtn(id) {
    if (confirm("Are you sure you want to leave this tour?") == true) {
        currentUser.deleteTour(id);
    } 
}