const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {type: String, required: true, lowercase: true, trim: true},
  first_name: {type: String, required: true, trim: true},
  last_name: {type: String, required: true, trim: true},
  password: {type: String, required: true}
})
module.exports = mongoose.model('user', userSchema);
