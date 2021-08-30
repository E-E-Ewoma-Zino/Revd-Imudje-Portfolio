const mongoose = require("mongoose");
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

// set up db
require(__dirname + "/config/db")(mongoose);

// set up Page
require(__dirname + "/middleware/page").createPage();

// @desc	for all home route "/"
// @route	home
app.use("/", require(__dirname + "/router/index"));
// @desc	for all admin route "/"
// @route	/admin
app.use("/admin", require(__dirname + "/router/admin"));

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log("started app at port 5000"));