const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.js');
//const Mailer = require('./mailing.js');

module.exports = class Mongo {
  async signup(email, first_name, last_name, password) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 8);
      User.create({email, first_name, last_name, password}).then(() =>{
        resolve();
      });
    });
  }

  getUsers(){
    return new Promise((resolve, reject) => {
      User.find({}, function(err, users){
        if(err) reject();
        resolve(users);
      });
    })
  }
  
   async assign(name,date,reminder) {
    return new Promise((resolve, reject) => {
      User.create({name, date, reminder}).then(() =>{
        resolve();
      });
    });
  }

}
