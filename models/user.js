const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  language: [
    {
      type: String
    }
  ],
  photo: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
