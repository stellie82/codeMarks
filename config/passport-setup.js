const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
require("dotenv").config();

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/github/redirect"
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        'social.github.id': profile.id
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          'social.github.id':profile.id,
          'social.github.token': token,
          'social.github.displayName': profile.displayName,
          'social.github.username': profile.username,
          'social.github.photo':profile.photos[0].value        
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

passport.use(new LocalStrategy(
	function(username, password, done) {
    
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (err) {        
				return done(err)
			}
			if (!userMatch) {        
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
        
				return done(null, false, { message: 'Incorrect password' })
      }
      
			return done(null, userMatch)
		})
	}
));