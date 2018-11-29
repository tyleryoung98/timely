const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
  email: {type: String, required: true, lowercase: true, trim: true, index: {unique: true}},
  first_name: {type: String, required: true, trim: true},
  last_name: {type: String, required: true, trim: true},
  password: {type: String, required: true},
  classes: [{
    name: {type: String, required: true, trim: true},
    date: {type: Date, required: true}
  }]
  //school: {type: String, trim: true},
  //major: {type:String, trim: true}
});

userSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.isPasswordValid = function(candidatePassword) {
  return new Promise((resolve) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) throw err;
      resolve(isMatch);
    });
  });
};


module.exports = mongoose.model('user', userSchema);
