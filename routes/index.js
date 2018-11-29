const router = require('express').Router();
const Mongo = require('../mongo.js');
const bcrypt = require('bcrypt');
const db = new Mongo();
const path = require('path');
// const Mailer = require('../mailing.js');
// const mailer = new Mailer();

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated())
    return next();

	//if the user is not authenticated then redirect them to the login page
	res.redirect('/');
}

module.exports = function(passport) {
  //login magic
  router.post('/login', passport.authenticate('timely-login', {
    successRedirect: '/app/profile.html',
    failureRedirect: '/',
    failureFlash : true
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/signup', function(req, res){
    console.log(req.body);
    const { email, first_name, last_name, password } = req.body;
    db.signup(email, first_name, last_name, password).then(() => {
      res.redirect('/app/profile.html');
    });
  });

	router.post('/assignments', function(req, res){
		console.log(req.body);
		const {name, date, remindMe} = req.body;
		db.addAssignment(req.user.email, name, date, date + ' ' + remindMe).then(() => {
			res.redirect('/app/assignments.html');
		});
	});

	router.post('/classes', function(req, res){
		console.log(req.body);
		const name = req.body.name;
		const date = req.body.date;
		db.addClass(req.user.email, name, date).then(() => {
			res.redirect('/app/classes.html');
		});
	});

	router.get('/profile', function(req, res){
		db.getProfile(req.user.email).then(function(profile){
			res.json(profile);
		});
	});

	router.get('/assignment', function(req, res){
		db.getProfile(req.user.email).then(function(profile){
			res.json(profile);
		});
	});
	router.get('/classes', function(req, res){
		db.getProfile(req.user.email).then(function(profile){
			res.json(profile);
		});
	});
	// router.get('/test-email', isAuthenticated, function(req, res) {
	// 	mailer.accountCreationMail(req.user.email);
	// 	res.send('sent email to ' + req.user.email + '!');
	// });

  return router;
}
