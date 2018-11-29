const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.js');
const Mailer = require('./mailing.js');
const mailer = new Mailer();

module.exports = class Mongo {
  async signup(email, first_name, last_name, password) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 8);
      User.create({email, first_name, last_name, password}).then(() =>{
        console.log('user created');
        mailer.accountCreationMail(email);
        console.log('email sent');
        resolve();
      }).catch(function(err){
        reject();
      });
    });
  }

  addAssignment(email, name, date, remindMe){
    return new Promise((resolve, reject)=>{
      User.findOne({email: email}, function(err, user){
        if(err) reject();
        else {
          console.out(typeof name);
          console.out(typeof date);
          console.out(typeof remindMe);
          user.assignments.add({name: name,
            date: date, remindMe: remindMe});
          resolve();
        }
      });
    });
  }

  getProfile(email){
    return new Promise((resolve, reject) => {
      User.findOne({email: email}, function(err, profile){
        if(err) reject();
        resolve(profile);
      });
    })
  }
}
