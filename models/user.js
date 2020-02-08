const mongoose = require("mongoose");
// const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  local: {
    username: String,
    email: {
      type: String,
      unique: true
    },
    password: String
  },
  social: {
    github: {
      id: String,
      token: String,
      displayName: String,
      username: String,
      photo: String
    }
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;