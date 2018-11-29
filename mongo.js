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
    let assign = {name: name, date: date, remindMe: remindMe};
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({email: email}, {$push:{assignments: assign}},
        function(err, success){
          if(err){
            console.log(err);
            reject();
          }
          else{
            resolve();
          }
        //if(err) reject();
        //else {
        //  user.assignments.push({name: name, date: date, remindMe: remindMe});
        //  user.save(done);
        //  resolve();

      });
    });
  }

  addClass(email, name, date){
    let section = {name: name, date: date};
    console.log(section);
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({email: email}, {$push:{sections: section}},
        function(err, success){
          if(err){
            console.log(err);
            reject();
          }
          else{
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
