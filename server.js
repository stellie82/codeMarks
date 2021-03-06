// Required modules
const express = require("express");
const keys=require("./keys");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const routes = require("./routes");
const authRoutes = require("./routes/auth-routes");
const path = require("path");
const db = require("./models");
require("dotenv").config();

// Setup Express app
const PORT = process.env.PORT || 3001;
const app = express();

const server = require('http').createServer(app);
const io = require("socket.io")(server);

// Configure middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use(
	session({
		secret: 'codemarks',
		resave: false,
		saveUninitialized: false
	})
)

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: ["http://localhost:3000","https://codemarks-app.herokuapp.com/"],// allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// Routes
app.use(routes);
app.use("/auth", authRoutes);

// Mongo DB connection
var MONGODB_URI = process.env.CONNECTION_STRING;

mongoose.connect(MONGODB_URI, {
  dbName: "codeMarks",
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log('Failed to connect to MongoDB Atlas');
    console.log(err);
  } else {
    console.log('Successfully connected to MongoDB Atlas');
  }
  mongoose.connection.db.listCollections().toArray(function(err, names) {
    if (err) {
      console.log(err);
    } else {
      console.log('The following collections are visible:');
      let j = 1;
      names.forEach((e, i, a) => {
        console.log(j + ')  ' + e.name);
        j++;
      } );
    }
  })
});

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

// Start API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

io.on('connection', (socket) => {
  let postKey = socket.handshake.query.postKey;
  let userKey = socket.handshake.query.userKey;
  socket.join(postKey);
  socket.postKey = postKey;
  socket.userKey = userKey;
  console.log('socket opened for ' + (socket.userKey ? ('user ' + socket.userKey) : 'guest'));
  db.Comment
    .find({ post_id: socket.postKey })
    .populate('author')
    .sort({ date: -1 })
    .then(dbModel => {
      console.log(dbModel);
      socket.emit('existingComments', JSON.stringify(dbModel));
    })
    .catch(err => console.log(err));
  socket.on('newCommentRequest', (commentData) => {
    if (!socket.userKey) return;
    commentData.post_id = socket.postKey;
    commentData.author = socket.userKey;
    db.Comment
      .create(commentData)
      .then(dbModel => {
        // save to post's comments array here
        db.Comment
          .find({ _id: dbModel._id })
          .populate('author')
          .then(dbModel2 => {
            console.log(dbModel2);
            io.in(socket.postKey).emit('newComment', JSON.stringify(dbModel2));
          })
      })
      .catch(err => { console.log(err); });
  });
  socket.on('disconnect', (socket) => {
    // TODO: Is there anything we need to do here?
    console.log('socket closed for ' + (socket.userKey ? ('user ' + socket.userKey) : 'guest'));
  });
});
