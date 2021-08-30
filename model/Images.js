// The module for the images
const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: String,
	path: String,
	size: Number
});

module.exports = new mongoose.model("Image", imageSchema);