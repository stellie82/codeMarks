const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const User=require('../models/user')

// when login is successful, retrieve user info
router.get("/checkAuth", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
// router.get("/logout", (req, res) => {
//   req.logout();
//   req.session = null;
//   res.clearCookie('session');
//   res.clearCookie('session.sig');
//   res.redirect(CLIENT_HOME_PAGE_URL);
// });

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');   
    res.redirect(CLIENT_HOME_PAGE_URL);
  });
  
});

// auth with twitter
router.get("/github", passport.authenticate("github"));

router.post("/login", passport.authenticate("local", {
  successRedirect: CLIENT_HOME_PAGE_URL,
  failureRedirect:CLIENT_HOME_PAGE_URL+"/login/local"
})
);

router.post('/signup', (req, res) => {
  
  const { username, email, password } = req.body
 
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {    
		if (userMatch) {
			return res.json({        
				error: `Sorry, already a user with the username exists: ${username}`
			})
		}
		const newUser = new User({
      'local.username': username,
      'local.email':email,
			'local.password': password
    })
    console.log("New User",newUser);
		newUser.save((err, savedUser) => {
      console.log("Saved User",savedUser);
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})


// redirect to home page after successfully login via twitter
router.get(
  "/github/redirect",
  passport.authenticate("github", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
