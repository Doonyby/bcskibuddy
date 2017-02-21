BCSKIBUDDY
==========
This is an app to find back country ski companions in your area specifically for the state of Utah.
This is meant to improve the safety of individuals accessing the backcountry and to grow the community.

Summary
-------
As a user, after creating a profile, this app will give you access to the community of back country
users in Utah.  On your home page, you can look up tours that other users have created and join them.  
After joining them, you can join the conversation of that individual tour by adding comments.  
If you wish to create a tour in a specific area, you can do so which will enable other users to join your tour.  With these methods, you will be able to access the back country with companions who can assist in group decisions and in avalanche/injury rescues if needs be.  

Live Site
---------
BCSKIBUDDY can be accessed at https://calm-meadow-29295.herokuapp.com/

Features
--------
| <img alt="Landing Page" src="./design_imgs/landingPage.png" width="350"> | <img alt="Info Page" src="./design_imgs/infoPage.png" width="350"> | <img alt="Home Page" src="./design_imgs/homePageView.png" width="350"> |
|:---:|:---:|:---:|
| Landing Page | Info Page | Home Page |

The basic design consists of landing, information, and home pages.  Most of the functionality of the app takes place after you have logged into your home page.  At this point you can access and edit your profile, and you can move between three panels that diplay either your organized tours, your joined tours, and scheduled tours that others have created.  These are each displayed below. 

| <img alt="Organized Tours" src="./design_imgs/organizeTourUnfocus.png" width="350"> | <img alt="Joined Tours" src="./design_imgs/joinTourFocus.png" width="350"> | <img alt="Future " src="./design_imgs/futureSkiTourfocus.png" width="350"> |
|:---:|:---:|:---:|
| Organized Tours | Joined Tours | Upcoming Tours |

With each of these panels, you have the option to organize as many tours as you want, and join as many tours as you want.  Once a tour is organized or joined, there is a running comment feed that can be used for planning tour details or other conversation.  When you have joined a tour, you have the link to check the avalanche and snow report for that area from the utah avalanche center, and you also have the option to edit/leave tours as well.


Technology
----------

### Front End
 - HTML5
 - CSS3
 -[Bootstrap](https://getbootstrap.com/)
 -[JQuery](https://jquery.com/)

### Back End, Testing, and Deployment
 - [Node](https://nodejs.org)
 - [Express](https://expressjs.com/)
 - [MongoDB](https://www.mongodb.com/)
 - [Mongoose ODM](http://mongoosejs.com/)
 - [Passport](http://passportjs.org/) - middleware for local and OAuth2.0 authentication
 - [Bcrypt](https://www.npmjs.com/package/bcrypt) - middleware for password hashing
 - [Mocha](https://mochajs.org/) - testing framework
 - [Chai](http://chaijs.com/) - assertion library for Node
 - [Travis CI](https://travis-ci.org/) - continuous integration service
 - [Heroku](https://www.heroku.com/) - cloud PaaS
 - [mLab](https://mlab.com/) - cloud database service


Future Directions
-----------------
The plan for this app is to eventually incorporate more states and other popular back country ski areas so that this app isn't specific to Utah.  I would also like to add other features that would add to the social aspect of the app such as: the ability to view bits of info from other user profiles including their experience level, ablility to contact other users directly, the ability to keep track of past trips and members you've been on tours with, the ability to add pictures to profiles, attach those pictures to comment feeds/tour lists.  I also have plans to add another front end framework onto the app to make the user experience run more smoothly.



