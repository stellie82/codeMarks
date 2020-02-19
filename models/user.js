const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

var userSchema = new Schema({
  local: {
    username: String,
    email: {
      type: String,
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

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

const User = mongoose.model("User", userSchema);

module.exports = User;
