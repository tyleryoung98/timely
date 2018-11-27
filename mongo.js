const mongoose = require('mongoose');

const User = require('./userInfo/user.js');
//const Mailer = require('./mailing.js');

module.exports = {
  signup: function(email, first_name, last_name, password){
    return new Promise((resolve, reject) =>{
      User.create({email, first_name, last_name, password, school, major}).then(() =>{
        resolve();
      });
    });
  },
  login: function(mail, pass){
    return new Promise((resolve, reject)=>{
      User.findOne({email : mail}, function(err, user){
        if(err) throw err;
        user.comparePassword(pass, function(err, isMatch){
          if(err) throw err;
          console.log('Password:', isMatch);
        });
      }).then(()=>{
        resolve();
      });
    })
  }
}
