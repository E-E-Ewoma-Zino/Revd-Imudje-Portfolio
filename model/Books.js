// The module for the books
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: String,
	description: String,
	price: String,
	length: String,
	shelf: {
		ref: "Shelf",
		type: mongoose.Schema.Types.ObjectId
	},
	image: {
		ref: "Image",
		type: mongoose.Schema.Types.ObjectId
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("Book", bookSchema);