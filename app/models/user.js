//
var config = require('../../config');
//
const mongoose = require('mongoose');
//
mongoose.Promise = require('bluebird');
//
const conn = mongoose.createConnection(config.database);
//
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean
})

const User = conn.model('User', UserSchema);
module.exports = User;
