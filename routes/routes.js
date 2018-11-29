const router = require('express').Router();
const Mongo = require('../mongo.js');
const bcrypt = require('bcrypt');
const db = new Mongo();
const path = require('path');

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

	router.get('/users', function(req, res){
		db.getUsers().then(function(users){
			res.json(users);
		});
	});
	
	router.get('/profile',function(req, res) {
		db.getProfile().then(function(profile) {
			res.json(profile);
		});
	});

  return router;
}
