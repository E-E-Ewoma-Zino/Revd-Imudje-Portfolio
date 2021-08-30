// The module for the Shelf where the books will be keept
const mongoose = require("mongoose");

const shelfSchema = mongoose.Schema({
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: String,
	path: String,
	size: Number
});

module.exports = new mongoose.model("Shelf", shelfSchema);