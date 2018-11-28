const router = require('express').Router();
const Mongo = require('../mongo.js');
let bcrypt = require('bcrypt');
let db = new Mongo();
const isAuthenticated = function (req, res, next) {
    db.verifyToken(req.headers['x-access-token']).then(next)
                                .catch(() => res.redirect('./index.html'));
};
const path = require('path');

module.exports = function() {
  router.post('/signup', function(req, res){
    console.log(req.body);
    const { email, first_name, last_name, password } = req.body;
    db.signup(email, first_name, last_name, password).then(() => {
      res.redirect('/');
    });
  }),

  router.post('/login', function(req, res) {
    const { email, password } = req.body;
    console.log(`email: ${email}\npassword: ${password}`);

    db.login(email, password)
      .then(() => res.redirect('/assignments'))
      .catch(()=> res.redirect('./index.html'));
  });

  router.get('/assignments', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/','assignments.html'));
  });

  router.get('/about', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/','about.html'));
  });

  router.get('/classes', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/','classes.html'));
  });

  router.get('/profile', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/','profile.html'));
  });

  //UNPROTECTED ROUTES
  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/','index.html'));
  });

  router.get('/createAcc.html', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/','createAcc.html'));
  });
  return router;
}
