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

}
