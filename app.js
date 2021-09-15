require("dotenv").config()
const methodOverride = require("method-override")
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const path = require("path");

// create app
const app = express();

// @desc	app configs
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
// Method override
app.use(methodOverride((req, res) => {
	if (req.body && typeof req.body === "object" && "_method" in req.body) {
		// looks in url post bodies and delete it
		let method = req.body._method;
		delete req.body._method;
		return method
	}
}));

// session setup
// tell app to use express session
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// set up db
require(__dirname + "/config/db")(mongoose);

// configure passport
require(__dirname + "/config/passport")(passport);

// set up Page
require(__dirname + "/middleware/page").createPage();

// @desc	for all home route "/"
// @route	home
app.use("/", require(__dirname + "/router/index"));
// @desc	for all admin route "/"
// @route	/admin
app.use("/admin", require(__dirname + "/router/admin"));

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log("started app at port 5000"));