const mongoose = require('mongoose');

const User = require('./userInfo/user.js');

module.exports = {
  signup: function(email, first_name, last_name, password){
    return new Promise((resolve, reject) =>{
    User.create({email, first_name, last_name, password}).then(() => {
      resolve();});
    });
  }
  login: function(email, password){
    return new Promise((resolve, reject)=>{
      User.find({'email' : email}).then(()=>{
        if()
      });
    })
  }
}
