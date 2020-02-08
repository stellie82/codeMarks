const passport = require("passport");
const Strategy = require("passport-github").Strategy;
const User = require("../models/user");

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
  new Strategy(
    {
      clientID: "e39a0f30f4d88c4f3bec",
      clientSecret: "bbb9f7815eb6527bfa3cc2bd5c85b75b27f645ef",
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
