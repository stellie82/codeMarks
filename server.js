// Required modules
const express = require("express");
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
const MongoClient = require("mongodb").MongoClient;
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
    origin: "http://localhost:3000", // allow to server to accept request from different origin
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
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log(err));

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/codeMarks";
// mongoose.connect(MONGODB_URI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });

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
  socket.join(postKey);
  socket.postKey = postKey;
  socket.emit('existingComments', []);  // TODO: send comments array here
  socket.on('newCommentRequest', (commentData) => {
    // TODO: save the comment via Mongoose here, and then broadcast it to the room:
    io.in(socket.postKey).emit('newComment', commentData);
  });
});

io.on('disconnect', (socket) => {
  console.log(socket);
});
