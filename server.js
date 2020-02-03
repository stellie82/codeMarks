// Required modules
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes");

// Setup Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
app.use(routes);

// Mongo DB connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/codeMarks";
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Start API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});